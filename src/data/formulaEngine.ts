// =============================================================================
// formulaEngine.ts — ម៉ាស៊ីនគណនារូបមន្តបែប Google Sheets (ស្រាល គ្មាន dependency)
// គណនាតម្លៃពិតពីតារាងលំហាត់ ដើម្បីផ្ទៀងផ្ទាត់ចម្លើយសិស្សដោយឆ្លាតវៃ។
// គាំទ្រ៖ SUM, AVERAGE, MAX, MIN, COUNT, COUNTA, COUNTIF, SUMIF, AVERAGEIF,
//        IF, IFS, AND, OR, NOT, ROUND, ABS, LEN, UPPER, LOWER, TRIM,
//        LEFT, RIGHT, CONCATENATE/CONCAT  + ប្រមាណវិធី + - * / & = <> > < >= <=
// =============================================================================

export type CellValue = number | string | boolean | null;

export interface FormulaResult {
  ok: boolean;
  value: CellValue;
  display: string;
  error?: string;
}

type Range = CellValue[];
type EvalValue = CellValue | Range;

const colLetter = (n: number): string => {
  let s = "";
  let x = n + 1;
  while (x > 0) {
    const r = (x - 1) % 26;
    s = String.fromCharCode(65 + r) + s;
    x = Math.floor((x - 1) / 26);
  }
  return s;
};

export function buildGrid(tableData: any[]): Record<string, CellValue> {
  const grid: Record<string, CellValue> = {};
  (tableData || []).forEach((row, rIdx) => {
    Object.keys(row).forEach((k, cIdx) => {
      grid[colLetter(cIdx) + (rIdx + 2)] = row[k];
    });
  });
  return grid;
}

interface Tok { type: string; value: string; }

function tokenize(input: string): Tok[] {
  const toks: Tok[] = [];
  let i = 0;
  while (i < input.length) {
    const c = input[i];
    if (c === " " || c === "\t") { i++; continue; }
    if (c === '"') {
      let j = i + 1, str = "";
      while (j < input.length && input[j] !== '"') { str += input[j]; j++; }
      toks.push({ type: "STRING", value: str });
      i = j + 1; continue;
    }
    if (/[0-9.]/.test(c)) {
      let num = "";
      while (i < input.length && /[0-9.]/.test(input[i])) { num += input[i]; i++; }
      toks.push({ type: "NUMBER", value: num }); continue;
    }
    if (/[A-Za-z_]/.test(c)) {
      let id = "";
      while (i < input.length && /[A-Za-z0-9_]/.test(input[i])) { id += input[i]; i++; }
      toks.push({ type: "IDENT", value: id }); continue;
    }
    const two = input.substr(i, 2);
    if (two === ">=" || two === "<=" || two === "<>") { toks.push({ type: "OP", value: two }); i += 2; continue; }
    if ("+-*/&=<>".includes(c)) { toks.push({ type: "OP", value: c }); i++; continue; }
    if (c === "(") { toks.push({ type: "LPAREN", value: c }); i++; continue; }
    if (c === ")") { toks.push({ type: "RPAREN", value: c }); i++; continue; }
    if (c === ",") { toks.push({ type: "COMMA", value: c }); i++; continue; }
    if (c === ":") { toks.push({ type: "COLON", value: c }); i++; continue; }
    throw new Error("តួអក្សរមិនស្គាល់៖ " + c);
  }
  return toks;
}

const isCellRef = (s: string) => /^[A-Za-z]+[0-9]+$/.test(s);

const toNum = (v: EvalValue): number => {
  if (typeof v === "number") return v;
  if (typeof v === "boolean") return v ? 1 : 0;
  if (v === null || v === "") return 0;
  if (typeof v === "string" && v.trim() !== "" && !isNaN(Number(v))) return Number(v);
  throw new Error("តម្លៃមិនមែនជាលេខ៖ " + v);
};

const toStr = (v: EvalValue): string => {
  if (v === null) return "";
  if (typeof v === "boolean") return v ? "TRUE" : "FALSE";
  return String(v);
};

const truthy = (v: EvalValue): boolean => {
  if (typeof v === "boolean") return v;
  if (typeof v === "number") return v !== 0;
  if (typeof v === "string") return v.toUpperCase() === "TRUE";
  return !!v;
};

const flatNumbers = (args: EvalValue[]): number[] => {
  const out: number[] = [];
  for (const a of args) {
    const arr = Array.isArray(a) ? a : [a];
    for (const v of arr) {
      if (typeof v === "number") out.push(v);
      else if (typeof v === "string" && v.trim() !== "" && !isNaN(Number(v))) out.push(Number(v));
    }
  }
  return out;
};

const flatCells = (args: EvalValue[]): CellValue[] => {
  const out: CellValue[] = [];
  for (const a of args) {
    if (Array.isArray(a)) out.push(...a);
    else out.push(a);
  }
  return out;
};

const matchCriteria = (cell: CellValue, criteria: CellValue): boolean => {
  const crit = toStr(criteria).trim();
  const m = crit.match(/^(>=|<=|<>|>|<|=)?\s*(.*)$/);
  const op = m?.[1] || "=";
  const target = m?.[2] ?? "";
  const cellNum = typeof cell === "number" ? cell : Number(cell);
  const targetNum = Number(target);
  const numeric = !isNaN(cellNum) && target.trim() !== "" && !isNaN(targetNum);
  switch (op) {
    case ">": return numeric && cellNum > targetNum;
    case "<": return numeric && cellNum < targetNum;
    case ">=": return numeric && cellNum >= targetNum;
    case "<=": return numeric && cellNum <= targetNum;
    case "<>": return toStr(cell).trim().toLowerCase() !== target.trim().toLowerCase();
    default:
      if (numeric) return cellNum === targetNum;
      return toStr(cell).trim().toLowerCase() === target.trim().toLowerCase();
  }
};

function callFunction(name: string, args: EvalValue[]): EvalValue {
  const fn = name.toUpperCase();
  switch (fn) {
    case "SUM": return flatNumbers(args).reduce((a, b) => a + b, 0);
    case "AVERAGE":
    case "AVG": {
      const n = flatNumbers(args);
      if (n.length === 0) return 0;
      return n.reduce((a, b) => a + b, 0) / n.length;
    }
    case "MAX": return Math.max(...flatNumbers(args));
    case "MIN": return Math.min(...flatNumbers(args));
    case "COUNT": return flatNumbers(args).length;
    case "COUNTA": return flatCells(args).filter((v) => v !== null && v !== undefined && v !== "").length;
    case "COUNTIF": {
      const range = Array.isArray(args[0]) ? args[0] : [args[0]];
      return range.filter((v) => matchCriteria(v, args[1] as CellValue)).length;
    }
    case "SUMIF": {
      const range = Array.isArray(args[0]) ? args[0] : [args[0]];
      const sumRange = Array.isArray(args[2]) ? args[2] : range;
      let total = 0;
      range.forEach((v, idx) => {
        if (matchCriteria(v, args[1] as CellValue)) {
          const s = sumRange[idx];
          if (typeof s === "number") total += s;
          else if (typeof s === "string" && !isNaN(Number(s))) total += Number(s);
        }
      });
      return total;
    }
    case "AVERAGEIF": {
      const range = Array.isArray(args[0]) ? args[0] : [args[0]];
      const avgRange = Array.isArray(args[2]) ? args[2] : range;
      const vals: number[] = [];
      range.forEach((v, idx) => {
        if (matchCriteria(v, args[1] as CellValue)) {
          const s = avgRange[idx];
          if (typeof s === "number") vals.push(s);
          else if (typeof s === "string" && !isNaN(Number(s))) vals.push(Number(s));
        }
      });
      return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
    }
    case "IF": return truthy(args[0]) ? (args[1] as CellValue) : (args[2] !== undefined ? (args[2] as CellValue) : false);
    case "IFS": {
      for (let i = 0; i + 1 < args.length; i += 2) {
        if (truthy(args[i])) return args[i + 1] as CellValue;
      }
      throw new Error("IFS៖ គ្មានលក្ខខណ្ឌណាពិតទេ");
    }
    case "AND": return flatCells(args).every((v) => truthy(v));
    case "OR": return flatCells(args).some((v) => truthy(v));
    case "NOT": return !truthy(args[0]);
    case "ROUND": {
      const d = args[1] !== undefined ? toNum(args[1]) : 0;
      const f = Math.pow(10, d);
      return Math.round(toNum(args[0]) * f) / f;
    }
    case "ABS": return Math.abs(toNum(args[0]));
    case "LEN": return toStr(args[0] as CellValue).length;
    case "UPPER": return toStr(args[0] as CellValue).toUpperCase();
    case "LOWER": return toStr(args[0] as CellValue).toLowerCase();
    case "TRIM": return toStr(args[0] as CellValue).trim();
    case "LEFT": return toStr(args[0] as CellValue).slice(0, args[1] !== undefined ? toNum(args[1]) : 1);
    case "RIGHT": {
      const s = toStr(args[0] as CellValue);
      const n = args[1] !== undefined ? toNum(args[1]) : 1;
      return s.slice(Math.max(0, s.length - n));
    }
    case "CONCATENATE":
    case "CONCAT": return flatCells(args).map((v) => toStr(v)).join("");
    default: throw new Error("មិនទាន់គាំទ្ររូបមន្ត៖ " + name + "()");
  }
}

function parse(tokens: Tok[], grid: Record<string, CellValue>): EvalValue {
  let pos = 0;
  const peek = () => tokens[pos];
  const next = () => tokens[pos++];
  const expect = (type: string) => {
    if (!peek() || peek().type !== type) throw new Error("រូបមន្តមិនត្រឹមត្រូវ (រំពឹង " + type + ")");
    return next();
  };

  const cellValue = (ref: string): CellValue => {
    const v = grid[ref.toUpperCase()];
    return v === undefined ? null : v;
  };

  const rangeValues = (a: string, b: string): Range => {
    const pa = a.toUpperCase().match(/^([A-Z]+)([0-9]+)$/)!;
    const pb = b.toUpperCase().match(/^([A-Z]+)([0-9]+)$/)!;
    const c1 = pa[1].charCodeAt(0), c2 = pb[1].charCodeAt(0);
    const r1 = parseInt(pa[2], 10), r2 = parseInt(pb[2], 10);
    const out: Range = [];
    for (let c = Math.min(c1, c2); c <= Math.max(c1, c2); c++) {
      for (let r = Math.min(r1, r2); r <= Math.max(r1, r2); r++) {
        out.push(cellValue(String.fromCharCode(c) + r));
      }
    }
    return out;
  };

  function parsePrimary(): EvalValue {
    const t = peek();
    if (!t) throw new Error("រូបមន្តមិនពេញលេញ");
    if (t.type === "NUMBER") { next(); return Number(t.value); }
    if (t.type === "STRING") { next(); return t.value; }
    if (t.type === "LPAREN") { next(); const v = parseComparison(); expect("RPAREN"); return v; }
    if (t.type === "OP" && (t.value === "-" || t.value === "+")) {
      next(); const v = parseUnary(); return t.value === "-" ? -toNum(v) : toNum(v);
    }
    if (t.type === "IDENT") {
      next();
      if (peek() && peek().type === "LPAREN") {
        next();
        const args: EvalValue[] = [];
        if (peek() && peek().type !== "RPAREN") {
          args.push(parseComparison());
          while (peek() && peek().type === "COMMA") { next(); args.push(parseComparison()); }
        }
        expect("RPAREN");
        return callFunction(t.value, args);
      }
      const up = t.value.toUpperCase();
      if (up === "TRUE") return true;
      if (up === "FALSE") return false;
      if (isCellRef(t.value)) {
        if (peek() && peek().type === "COLON") {
          next();
          const end = expect("IDENT");
          return rangeValues(t.value, end.value);
        }
        return cellValue(t.value);
      }
      throw new Error("មិនស្គាល់៖ " + t.value);
    }
    throw new Error("រូបមន្តមិនត្រឹមត្រូវនៅ៖ " + t.value);
  }

  function parseUnary(): EvalValue {
    const t = peek();
    if (t && t.type === "OP" && (t.value === "-" || t.value === "+")) {
      next(); const v = parseUnary(); return t.value === "-" ? -toNum(v) : toNum(v);
    }
    return parsePrimary();
  }

  function parseMul(): EvalValue {
    let left = parseUnary();
    while (peek() && peek().type === "OP" && (peek().value === "*" || peek().value === "/")) {
      const op = next().value; const right = parseUnary();
      left = op === "*" ? toNum(left) * toNum(right) : toNum(left) / toNum(right);
    }
    return left;
  }

  function parseAdd(): EvalValue {
    let left = parseMul();
    while (peek() && peek().type === "OP" && (peek().value === "+" || peek().value === "-")) {
      const op = next().value; const right = parseMul();
      left = op === "+" ? toNum(left) + toNum(right) : toNum(left) - toNum(right);
    }
    return left;
  }

  function parseConcat(): EvalValue {
    let left = parseAdd();
    while (peek() && peek().type === "OP" && peek().value === "&") {
      next(); const right = parseAdd();
      left = toStr(left) + toStr(right);
    }
    return left;
  }

  function parseComparison(): EvalValue {
    let left = parseConcat();
    while (peek() && peek().type === "OP" && ["=", "<>", ">", "<", ">=", "<="].includes(peek().value)) {
      const op = next().value; const right = parseConcat();
      const bothNum = typeof left === "number" && typeof right === "number";
      const l = bothNum ? (left as number) : toStr(left).toLowerCase();
      const r = bothNum ? (right as number) : toStr(right).toLowerCase();
      switch (op) {
        case "=": left = l === r; break;
        case "<>": left = l !== r; break;
        case ">": left = l > r; break;
        case "<": left = l < r; break;
        case ">=": left = l >= r; break;
        case "<=": left = l <= r; break;
      }
    }
    return left;
  }

  const result = parseComparison();
  if (pos < tokens.length) throw new Error("មានតួអក្សរលើសនៅចុងរូបមន្ត");
  return result;
}

export function evaluateFormula(formula: string, tableData: any[]): FormulaResult {
  try {
    let f = (formula || "").trim();
    if (!f) return { ok: false, value: null, display: "", error: "រូបមន្តទទេ" };
    if (f.startsWith("=")) f = f.slice(1);
    const grid = buildGrid(tableData);
    const tokens = tokenize(f);
    const value = parse(tokens, grid);
    if (Array.isArray(value)) return { ok: false, value: null, display: "", error: "លទ្ធផលជា range" };
    return { ok: true, value, display: formatValue(value) };
  } catch (e: any) {
    return { ok: false, value: null, display: "", error: e?.message || "កំហុសក្នុងការគណនា" };
  }
}

export function formatValue(v: CellValue): string {
  if (v === null || v === undefined) return "";
  if (typeof v === "boolean") return v ? "TRUE" : "FALSE";
  if (typeof v === "number") return Number.isInteger(v) ? String(v) : v.toFixed(2);
  return String(v);
}

export function resultsEqual(a: CellValue, b: CellValue): boolean {
  if (typeof a === "number" && typeof b === "number") return Math.abs(a - b) < 0.01;
  return toStr(a).trim().toLowerCase() === toStr(b).trim().toLowerCase();
}