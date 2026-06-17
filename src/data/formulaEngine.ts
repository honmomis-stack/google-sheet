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

// A range keeps its shape (w×h) so 2-D lookups (VLOOKUP/INDEX/HLOOKUP) work.
// Values are stored column-major: index = col * h + row.
type Range = CellValue[] & { w?: number; h?: number };
type EvalValue = CellValue | Range;

// Spreadsheet error sentinels — returned (not thrown) so IFERROR can catch them.
const NA = "#N/A";
const VALUE_ERR = "#VALUE!";
const ERRORS = ["#N/A", "#VALUE!", "#REF!", "#DIV/0!", "#ERROR!", "#NAME?"];
const isErr = (v: EvalValue): boolean => typeof v === "string" && ERRORS.includes(v);

const rangeGet = (range: Range, row0: number, col0: number): CellValue => {
  const h = range.h ?? range.length;
  const v = range[col0 * h + row0];
  return v === undefined ? null : v;
};

// Minimal TEXT()/number-format: enough for "$#,##0.00", "0.00", "0%".
const formatText = (n: number, fmt: string): string => {
  const decimals = (fmt.split(".")[1] || "").replace(/[^0#]/g, "").length;
  if (fmt.includes("%")) return (n * 100).toFixed(decimals) + "%";
  const body = n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return fmt.includes("$") ? "$" + body : body;
};

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

    // ── extra math/stat ──────────────────────────────────────────────────
    case "MEDIAN": {
      const n = flatNumbers(args).sort((a, b) => a - b);
      if (!n.length) return 0;
      const mid = Math.floor(n.length / 2);
      return n.length % 2 ? n[mid] : (n[mid - 1] + n[mid]) / 2;
    }
    case "COUNTBLANK": return flatCells(args).filter((v) => v === null || v === "").length;
    case "INT": return Math.floor(toNum(args[0]));
    case "MOD": return toNum(args[0]) % toNum(args[1]);
    case "POWER": return Math.pow(toNum(args[0]), toNum(args[1]));
    case "SQRT": return Math.sqrt(toNum(args[0]));
    case "ROUNDUP": { const f = Math.pow(10, args[1] !== undefined ? toNum(args[1]) : 0); return Math.ceil(toNum(args[0]) * f) / f; }
    case "ROUNDDOWN": { const f = Math.pow(10, args[1] !== undefined ? toNum(args[1]) : 0); return Math.trunc(toNum(args[0]) * f) / f; }

    // ── multi-criteria ───────────────────────────────────────────────────
    case "SUMIFS": case "COUNTIFS": case "AVERAGEIFS": {
      const counting = fn === "COUNTIFS";
      const valRange = counting ? null : (args[0] as Range);
      const critStart = counting ? 0 : 1;
      const ref = (counting ? (args[0] as Range) : valRange) as Range;
      const picked: number[] = [];
      let count = 0;
      for (let i = 0; i < ref.length; i++) {
        let ok = true;
        for (let a = critStart; a + 1 < args.length; a += 2) {
          if (!matchCriteria((args[a] as Range)[i], args[a + 1] as CellValue)) { ok = false; break; }
        }
        if (!ok) continue;
        count++;
        if (valRange) { const s = valRange[i]; if (typeof s === "number") picked.push(s); else if (typeof s === "string" && !isNaN(Number(s))) picked.push(Number(s)); }
      }
      if (counting) return count;
      if (fn === "SUMIFS") return picked.reduce((a, b) => a + b, 0);
      return picked.length ? picked.reduce((a, b) => a + b, 0) / picked.length : 0;
    }
    case "SUMPRODUCT": {
      const ranges = args.map((a) => (Array.isArray(a) ? a : [a]));
      const len = Math.max(...ranges.map((r) => r.length));
      let total = 0;
      for (let i = 0; i < len; i++) {
        let prod = 1;
        for (const r of ranges) { const v = r.length === 1 ? r[0] : r[i]; prod *= typeof v === "number" ? v : Number(v) || 0; }
        total += prod;
      }
      return total;
    }

    // ── lookup ───────────────────────────────────────────────────────────
    case "VLOOKUP": {
      const range = args[1] as Range, h = range.h ?? range.length, col = toNum(args[2]);
      for (let r = 0; r < h; r++) if (resultsEqual(range[r], args[0] as CellValue)) return rangeGet(range, r, col - 1);
      return NA;
    }
    case "HLOOKUP": {
      const range = args[1] as Range, w = range.w ?? range.length, row = toNum(args[2]);
      for (let c = 0; c < w; c++) if (resultsEqual(rangeGet(range, 0, c), args[0] as CellValue)) return rangeGet(range, row - 1, c);
      return NA;
    }
    case "INDEX": {
      if (isErr(args[1]) || isErr(args[2])) return NA;
      const range = args[0] as Range;
      return rangeGet(range, toNum(args[1]) - 1, (args[2] !== undefined ? toNum(args[2]) : 1) - 1);
    }
    case "MATCH": case "XMATCH": {
      const range = args[1] as Range;
      for (let i = 0; i < range.length; i++) if (resultsEqual(range[i], args[0] as CellValue)) return i + 1;
      return NA;
    }
    case "XLOOKUP": {
      const lookup = args[1] as Range, ret = args[2] as Range;
      for (let i = 0; i < lookup.length; i++) if (resultsEqual(lookup[i], args[0] as CellValue)) return ret[i] ?? NA;
      return args[3] !== undefined ? (args[3] as CellValue) : NA;
    }

    // ── error/info ───────────────────────────────────────────────────────
    case "IFERROR": return isErr(args[0]) ? (args[1] as CellValue) : (args[0] as CellValue);
    case "ISERROR": return isErr(args[0]);
    case "ISBLANK": return args[0] === null || args[0] === "";
    case "ISNUMBER": return typeof args[0] === "number";
    case "ISTEXT": return typeof args[0] === "string" && !isErr(args[0]);

    // ── text ─────────────────────────────────────────────────────────────
    case "MID": return toStr(args[0] as CellValue).substr(Math.max(0, toNum(args[1]) - 1), toNum(args[2]));
    case "PROPER": return toStr(args[0] as CellValue).replace(/\S+/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
    case "REPT": return toStr(args[0] as CellValue).repeat(Math.max(0, toNum(args[1])));
    case "SUBSTITUTE": return toStr(args[0] as CellValue).split(toStr(args[1] as CellValue)).join(toStr(args[2] as CellValue));
    case "REPLACE": { const s = toStr(args[0] as CellValue), st = toNum(args[1]), ln = toNum(args[2]); return s.slice(0, st - 1) + toStr(args[3] as CellValue) + s.slice(st - 1 + ln); }
    case "FIND": { const idx = toStr(args[1] as CellValue).indexOf(toStr(args[0] as CellValue)); return idx < 0 ? VALUE_ERR : idx + 1; }
    case "SEARCH": { const idx = toStr(args[1] as CellValue).toLowerCase().indexOf(toStr(args[0] as CellValue).toLowerCase()); return idx < 0 ? VALUE_ERR : idx + 1; }
    case "EXACT": return toStr(args[0] as CellValue) === toStr(args[1] as CellValue);
    case "VALUE": return toNum(args[0]);
    case "TEXTJOIN": {
      const delim = toStr(args[0] as CellValue), ignoreEmpty = truthy(args[1]);
      return flatCells(args.slice(2)).map((v) => toStr(v)).filter((s) => !ignoreEmpty || s !== "").join(delim);
    }
    case "HYPERLINK": return toStr((args[1] !== undefined ? args[1] : args[0]) as CellValue);
    case "TEXT": return formatText(toNum(args[0]), toStr(args[1] as CellValue));

    // ── date (display only) ──────────────────────────────────────────────
    case "TODAY": return new Date().toLocaleDateString("en-GB");
    case "NOW": return new Date().toLocaleString("en-GB");

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
    const cLo = Math.min(c1, c2), cHi = Math.max(c1, c2);
    const rLo = Math.min(r1, r2), rHi = Math.max(r1, r2);
    const out: Range = [];
    for (let c = cLo; c <= cHi; c++) {
      for (let r = rLo; r <= rHi; r++) {
        out.push(cellValue(String.fromCharCode(c) + r));
      }
    }
    out.w = cHi - cLo + 1;
    out.h = rHi - rLo + 1;
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