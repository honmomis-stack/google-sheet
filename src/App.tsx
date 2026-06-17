import { useState, useEffect } from "react";
import Markdown from "react-markdown";
import { 
  BookOpen, 
  Coins, 
  Users, 
  FileText, 
  Send, 
  CheckCircle, 
  XCircle, 
  Info, 
  HelpCircle, 
  MessageSquare, 
  Plus, 
  Trash2, 
  Sparkles, 
  ArrowRight, 
  Settings, 
  Bell, 
  Smartphone, 
  Play, 
  Layers, 
  ArrowUpRight, 
  ArrowDownRight,
  TrendingUp,
  FileSpreadsheet,
  Calculator,
  Type,
  Filter,
  Database,
  Search,
  X,
  AlertTriangle,
  AlertCircle,
  ExternalLink,
  Terminal,
  Layout,
  Mail,
  GraduationCap,
  FileSignature,
  Globe,
  Boxes,
  Youtube,
  ShieldCheck,
  Shield,
  Download,
  Lightbulb,
  Copy,
  ClipboardCopy,
  MousePointerClick,
  Lock,
  LogOut,
  UserCog,
  Code,
  Loader2,
  Activity
} from "lucide-react";
import { lessonsList, formulaQuests, taxBracketsCambodia } from "./data/lessonsData";
import { generateAppScript } from "./data/appScriptGenerator";
import { Lesson, FormulaQuest, ChatMessage } from "./types";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import * as XLSX from "xlsx";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

import { supabase } from "./supabase";
import { User } from "@supabase/supabase-js";

const checkFormulaSyntax = (formula: string): string | null => {
  if (!formula.trim()) return null;
  if (!formula.trim().startsWith('=')) {
    return "កំហុសឆ្គង៖ រូបមន្តត្រូវតែចាប់ផ្ដើមដោយសញ្ញា = (ស្មើ)";
  }
  let openCount = 0;
  let inQuotes = false;
  for (let i = 0; i < formula.length; i++) {
      const char = formula[i];
      if (char === '"') {
          inQuotes = !inQuotes;
      } else if (!inQuotes) {
          if (char === '(') openCount++;
          else if (char === ')') openCount--;
      }
      if (openCount < 0) {
          return "កំហុសឆ្គងពីវាក្យសម្ពន្ធ (Syntax)៖ មានសញ្ញាឃ្នាបបិទ \")\" លើស ដែលមិនមានរង្វង់ក្រចកបើក \"(\" ជាគូ";
      }
  }
  if (openCount > 0) {
      return "កំហុសឆ្គងពីវាក្យសម្ពន្ធ (Syntax)៖ ភ្លេចបិទរង្វង់ក្រចក \")\" នៅខាងចុង ឬកន្លែងណាមួយ";
  }
  if (inQuotes) {
      return 'កំហុសឆ្គងពីវាក្យសម្ពន្ធ (Syntax)៖ ភ្លេចបិទសញ្ញាធ្មេញកណ្ដុរ " សម្រាប់អត្ថបទ';
  }
  return null;
};

const generateAppsScriptCode = (quest: FormulaQuest) => {
  if (!quest) return "";
  const title = (quest.titleKh || 'Sheet').replace(/"/g, "\\\"");
  const headers = JSON.stringify(quest.headers || []);
  const data = JSON.stringify((quest.tableData || []).map((row: any) => Object.keys(row).map(k => row[k])));
  const targetForm = (quest.correctAnswers?.[0] || '').replace(/"/g, "\\\"");
  return `function createPracticeSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  sheet.setName("${title}");

  var headers = ${headers};
  sheet.appendRow(headers);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#e2e8f0");

  var data = ${data};
  sheet.getRange(2, 1, data.length, headers.length).setValues(data);

  var targetRow = data.length + 2;
  sheet.getRange(targetRow, 1).setValue("ចម្លើយ (Result) ➡").setFontWeight("bold");
  sheet.getRange(targetRow, headers.length).setFormula("${targetForm}");
}`;
};

const exportHTMLToPDF = async (elementId: string, filename: string = 'export.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) return;
  // Temporary style adjustments to prevent scrollbars in PDF capturing
  const originalMaxHeight = element.style.maxHeight;
  const originalOverflow = element.style.overflow;
  element.style.maxHeight = 'none';
  element.style.overflow = 'visible';

  // Find and reveal title elements temporarily
  const titleElements = element.querySelectorAll('.pdf-export-title');
  titleElements.forEach((el) => {
    (el as HTMLElement).style.display = 'block';
  });

  try {
    const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
    const imgData = canvas.toDataURL('image/png');
    
    const orientation = canvas.width > canvas.height ? 'l' : 'p';
    const pdf = new jsPDF(orientation, 'mm', 'a4');
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const padding = 10;
    const contentWidth = pdfWidth - padding * 2;
    const contentHeight = (canvas.height * contentWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', padding, padding, contentWidth, contentHeight);
    pdf.save(filename);
  } catch (error) {
    console.error("PDF Export failed:", error);
  } finally {
    element.style.maxHeight = originalMaxHeight;
    element.style.overflow = originalOverflow;
    titleElements.forEach((el) => {
      (el as HTMLElement).style.display = 'none';
    });
  }
};

// ── Guest mode (no-login): first 5 exercises free, then buy at reankh.org ──
const REANKH_PRODUCT_URL = "https://reankh.org/products/22711f1f-9ea4-47ba-99f9-8ec222a01dde";
const GSHEET_APP_URL = "https://google-sheet.reankh.org/";
const GUEST_FREE_LIMIT = 5;
const GUEST_TABS = ["practice-easy", "practice-medium", "practice-advanced"];

// One source of truth for the golden-code message — used by both the "Copy"
// and "send to Telegram" actions so the access link is always included.
const buildGoldenCodeMessage = (code: string) =>
  `🎉 សួស្តី! នេះគឺជា *លេខកូដសម្ងាត់មាស (Golden Code)* អញ្ជើញចូលប្រើប្រាស់ប្រព័ន្ធកម្រិតខ្ពស់ សាលាខ្មែរ Google Sheets:\n\n🔑 កូដរបស់អ្នក៖ ${code}\n\n🔗 តំណចូល៖ ${GSHEET_APP_URL}\n\n👉 របៀបចូលប្រើ៖\n១. ចូលទៅកាន់តំណខាងលើ\n២. ចូលប្រើគណនី Gmail របស់អ្នក\n៣. បញ្ចូលលេខកូដខាងលើដើម្បីទទួលបានសិទ្ធិពេញលេញ\n\n(បញ្ជាក់៖ លេខកូដនេះប្រើបានតែ ១ លើកប៉ុណ្ណោះ។ លើកក្រោយមិនតម្រូវឱ្យប្រើកូដទៀតទេ)`;

export default function App() {
  // Authentication State
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  
  const [enteredCode, setEnteredCode] = useState<string>("");
  const [codeError, setCodeError] = useState<string>("");

  const [goldenCodes, setGoldenCodes] = useState<any[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [activeStudents, setActiveStudents] = useState<any[]>([]);

  // Bakong payment mock state
  const [showPurchaseModal, setShowPurchaseModal] = useState<boolean>(false);
  const [purchaseStep, setPurchaseStep] = useState<number>(1);
  const [telegramUsername, setTelegramUsername] = useState<string>("");
  const [generatedPurchasedCode, setGeneratedPurchasedCode] = useState<string>("");

  // Guest mode + paywall (guest = not approved, no login required)
  const [isGuest, setIsGuest] = useState<boolean>(false);
  const [showPaywall, setShowPaywall] = useState<boolean>(false);
  const [guestDone, setGuestDone] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem("gsheet_guest_done") || "[]"); } catch { return []; }
  });

  const simulateBakongPaymentAndSendCode = async () => {
    if (!user) return;
    setPurchaseStep(3); // Loading
    
    // Simulate 2 seconds of payment processing network delay
    setTimeout(async () => {
      try {
        const newCode = "G" + Math.random().toString(36).substring(2, 8).toUpperCase();
        // supabase-js does NOT throw on RLS/DB rejection — it returns { error }.
        // If we don't check it, a silently-rejected insert still shows "Success"
        // and hands the buyer a code that was never saved → redeem always fails.
        const { error } = await supabase.from("gsheet_codes").insert({
          code: newCode,
          created_by: user.email,
          created_at: new Date().toISOString(),
          status: 'active',
          used_by: null,
          used_at: null
        });
        if (error) throw error;
        setGeneratedPurchasedCode(newCode);
        setPurchaseStep(4); // Success!
      } catch(e) {
        console.warn("Payment code gen error", e);
        alert("មានបញ្ហាក្នុងការភ្ជាប់ សូមទូទាត់ម្ដងទៀត។");
        setPurchaseStep(1);
      }
    }, 2000);
  };

  const generateNewGoldenCode = async () => {
    if (!user) return;
    const newCode = "G" + Math.random().toString(36).substring(2, 8).toUpperCase();
    try {
      // supabase-js returns { error } on RLS/DB rejection instead of throwing.
      // Without this check a blocked insert (e.g. admin not detected → RLS denies)
      // would still report success and produce a code that isn't in the DB.
      const { error } = await supabase.from("gsheet_codes").insert({
        code: newCode,
        created_by: user.email,
        created_at: new Date().toISOString(),
        status: 'active'
      });
      if (error) throw error;
      fetchGoldenCodes();
      // Auto-deliver the new code to the admin's Telegram (tap-to-copy) so the
      // admin can forward it to the student without a second click.
      const sent = await postSendCode(newCode);
      alert(
        sent.ok
          ? `បានបង្កើតលេខកូដ ${newCode} ✓\nផ្ញើទៅ Telegram admin រួចរាល់ — សូម forward បន្តទៅសិស្ស។`
          : `បានបង្កើតលេខកូដ ${newCode} ✓\n(ផ្ញើ Telegram មិនបាន៖ ${sent.error})`
      );
    } catch (e) {
      console.error(e);
      alert("បរាជ័យក្នុងការបង្កើតលេខកូដ");
    }
  };

  // Core: bot-deliver a code to the admin's own Telegram (tap-to-copy <code>);
  // the admin then forwards it to the student. Returns the outcome so callers
  // (the per-row button AND auto-send on generate) can surface it their own way.
  const postSendCode = async (code: string): Promise<{ ok: boolean; error?: string }> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;
      if (!token) return { ok: false, error: "សម័យចូលផុតកំណត់ — សូម Login ឡើងវិញ។" };
      const res = await fetch("/api/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ code }),
      });
      const j = await res.json().catch(() => ({}));
      if (res.ok && j.ok) return { ok: true };
      return { ok: false, error: j.error || res.statusText };
    } catch (e) {
      console.error(e);
      return { ok: false, error: "បញ្ហាបណ្ដាញ" };
    }
  };

  const sendCodeViaBot = async (code: string) => {
    const r = await postSendCode(code);
    if (r.ok) alert(`ផ្ញើកូដ ${code} ទៅ Telegram admin ជោគជ័យ!\nសូម forward សារនោះបន្តទៅសិស្ស (tap-to-copy នៅដដែល)។`);
    else alert("ផ្ញើមិនបាន៖ " + r.error);
  };

  const fetchGoldenCodes = async () => {
    try {
      const { data, error } = await supabase.from('gsheet_codes').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setGoldenCodes(data || []);
    } catch (e) {
      console.warn("Could not fetch secrets, likely due to security rules if not admin:", e);
    }
  };

  const fetchAdminStats = async () => {
    try {
      const { data: users, count, error } = await supabase.from('gsheet_profiles').select('*', { count: 'exact' });
      if (error) throw error;
      setTotalUsers(count || 0);
      
      const students = users || [];
      const recentStudents = students.sort((a: any, b: any) => {
        const timeA = a.last_login ? new Date(a.last_login).getTime() : 0;
        const timeB = b.last_login ? new Date(b.last_login).getTime() : 0;
        return timeB - timeA;
      }).slice(0, 10);
      setActiveStudents(recentStudents);
    } catch (e) {
      console.warn("Could not fetch user stats:", e);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchGoldenCodes();
      fetchAdminStats();
    }
  }, [isAdmin]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      checkUserStatus(currentUser);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      checkUserStatus(currentUser);
    });

    const checkUserStatus = async (currentUser: any) => {
      if (currentUser) {
        try {
          const email = currentUser.email || '';
          if (email === 'hon.mom.is@gmail.com' || email === 'hon.mom.edu@gmail.com' || email === 'hon.mom.edu@gmail' || email === 'admin@gmail.com') {
             setIsAdmin(true);
             setIsApproved(true);
          } else {
             const { data: adminDoc } = await supabase.from('gsheet_admins').select('*').eq('id', currentUser.id).maybeSingle();
             if (adminDoc) {
               setIsAdmin(true);
               setIsApproved(true);
             } else {
               setIsAdmin(false);
               const { data: userDoc } = await supabase.from('gsheet_profiles').select('*').eq('id', currentUser.id).maybeSingle();
               if (userDoc && userDoc.is_approved) {
                 setIsApproved(true);
               } else {
                 setIsApproved(false);
               }
             }
          }
        } catch (error) {
          console.warn("Could not fetch user data:", error);
          setIsApproved(false);
        }
      } else {
        setIsAdmin(false);
        setIsApproved(false);
      }
      setAuthLoading(false);
    };

    return () => subscription.unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      // Shared Supabase project with reankh.org → its Site URL is reankh.org, so
      // WITHOUT redirectTo the OAuth callback bounces back to reankh.org. Pin the
      // return to THIS site's origin (must also be in Supabase Auth → Redirect URLs).
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin },
      });
    } catch (error) {
      console.error("Login failed:", error);
      alert("បរាជ័យក្នុងការចូលត៍ (Login failed)");
    }
  };

  const verifyGoldenCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enteredCode.trim() || !user) return;
    setCodeError("");
    setAuthLoading(true);

    try {
      // Redeem through the secure server-side function. The browser can NOT read
      // the codes table (RLS denies it), so codes can't be harvested. The function
      // validates the code, optionally checks the bound Gmail, marks it used, and
      // approves this account — all atomically.
      const { data, error } = await supabase.rpc('gsheet_redeem_code', {
        p_code: enteredCode.trim(),
      });

      if (error) throw error;

      // Diagnostic: surface exactly what the redeem RPC returned so a valid code
      // that still fails (e.g. auth.uid() is null → 'not_authenticated') is
      // distinguishable from a genuinely bad/used code.
      console.log('[gsheet_redeem_code] response:', data);

      if (data?.ok) {
        setIsApproved(true);
      } else if (data?.error === 'email_mismatch') {
        setCodeError("លេខកូដនេះ​ភ្ជាប់​នឹង Gmail ផ្សេង។ សូម​ចូល​ដោយ Gmail ដែល​បាន​ទិញ។");
      } else if (data?.error === 'not_authenticated') {
        // The code is fine — the session JWT didn't reach the server. Almost always
        // the Google OAuth session wasn't established on THIS origin (shared
        // Supabase: this site's URL must be in Auth → Redirect URLs).
        setCodeError("សម័យ​ចូល​បាន​ផុត​កំណត់។ សូម​ចេញ ហើយ Login ជាមួយ Google ម្ដង​ទៀត។");
      } else {
        setCodeError("លេខសម្ងាត់មាសមិនត្រឹមត្រូវ រឺ ត្រូវបានប្រើ​រួច។");
      }
    } catch (error) {
      console.error("Verification error:", error);
      setCodeError("មាន​បញ្ហា​ក្នុង​ការ​ផ្ទៀងផ្ទាត់។ សូម​ព្យាយាម​ម្ដង​ទៀត។");
    }
    setAuthLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // Navigation State
  const [activeTab, setActiveTab] = useState<string>("learn-formulas"); // learn-formulas, practice-easy, practice-medium, practice-advanced, prompt-app-script, tutorial, telegram, payroll, employee, finance, admin
  const [selectedTutorialId, setSelectedTutorialId] = useState<string | null>(null);
  
  // Lesson Progress Simulation
  const [completedLessons, setCompletedLessons] = useState<string[]>(["overview"]);
  
  // Interactive Spreadsheet Game/Sandbox
  const [selectedQuestIdx, setSelectedQuestIdx] = useState<number>(0);
  const [questSearchQuery, setQuestSearchQuery] = useState<string>("");
  const [userFormula, setUserFormula] = useState<string>("");
  const [questStatus, setQuestStatus] = useState<"idle" | "correct" | "incorrect">("idle");

  // Guests may only use the Practice tabs — bounce them off premium tabs.
  useEffect(() => {
    if (!isApproved && !GUEST_TABS.includes(activeTab)) {
      setActiveTab(GUEST_TABS[0]);
    }
  }, [isApproved, activeTab]);
  const [sandboxResult, setSandboxResult] = useState<string | number | null>(null);
  const [showFormulaExamples, setShowFormulaExamples] = useState<boolean>(false);
  const [showAppScriptInline, setShowAppScriptInline] = useState<boolean>(false);

  // 1. Payroll Simulator State
  const [payrollEmployees, setPayrollEmployees] = useState([
    { id: 1, name: "សុខ ចាន់ដារ៉ា", baseSalary: 450, bonus: 50, taxRate: 0, netSalary: 500 },
    { id: 2, name: "ម៉ៅ វិច្ឆិកា", baseSalary: 1200, bonus: 100, taxRate: 10, netSalary: 1105 },
    { id: 3, name: "ហេង សុភ័ក្ត្រ", baseSalary: 650, bonus: 30, taxRate: 5, netSalary: 655 },
    { id: 4, name: "ស្រី ពេជ្រ", baseSalary: 2300, bonus: 150, taxRate: 15, netSalary: 1955 }
  ]);
  const [newEmployeeName, setNewEmployeeName] = useState("");
  const [newEmployeeSalary, setNewEmployeeSalary] = useState("500");
  const [newEmployeeBonus, setNewEmployeeBonus] = useState("50");

  // Cambodian Tax calculator assistant
  const [inputRiels, setInputRiels] = useState<number>(2500000);
  const [calculatedTaxRate, setCalculatedTaxRate] = useState<number>(10);
  const [calculatedTaxAmount, setCalculatedTaxAmount] = useState<number>(75000);

  // 2. Employee Management System Simulation
  const [employeeDb, setEmployeeDb] = useState([
    { id: "EMP001", name: "សុខ ជា", gender: "ប្រុស", role: "រដ្ឋបាល", email: "cheasokh@gmail.com", status: "សកម្ម" },
    { id: "EMP002", name: "ចាន់ ធារី", gender: "ស្រី", role: "គណនេយ្យ", email: "thearychan@gmail.com", status: "សកម្ម" },
    { id: "EMP003", name: "ម៉ៅ វិបុល", gender: "ប្រុស", role: "លក់", email: "vibolmao@gmail.com", status: "សកម្ម" },
    { id: "EMP004", name: "ស៊ិន សូនី", gender: "ស្រី", role: "រដ្ឋបាល", email: "sonysin@gmail.com", status: "វិស្សមកាល" }
  ]);
  const [newStaff, setNewStaff] = useState({
    id: "EMP005",
    name: "",
    gender: "ស្រី",
    role: "រដ្ឋបាល",
    email: "",
    status: "សកម្ម"
  });
  const [roleFilter, setRoleFilter] = useState("ទាំងអស់");
  const [showValidationHelpModal, setShowValidationHelpModal] = useState<boolean>(false);
  const [showGoogleSheetsModal, setShowGoogleSheetsModal] = useState<boolean>(false);
  const [showCsvGuidelinesModal, setShowCsvGuidelinesModal] = useState<boolean>(false);

  // Helper to convert an Array of Arrays (AOA) to SheetJS Worksheet with working formulas
  const arrayToSheet = (data: any[][]) => {
    const ws: any = {};
    const maxCols = Math.max(...data.map(r => r.length));
    ws['!ref'] = `A1:${XLSX.utils.encode_col(maxCols - 1)}${data.length}`;
    
    // Add columns width for readability
    const colsWidth: any[] = [{ wch: 35 }, { wch: 20 }, { wch: 18 }, { wch: 22 }, { wch: 20 }, { wch: 25 }];
    ws['!cols'] = colsWidth;

    for (let r = 0; r < data.length; r++) {
      for (let c = 0; c < data[r].length; c++) {
        const val = data[r][c];
        const cellRef = XLSX.utils.encode_cell({ r, c });
        if (val === undefined || val === null || val === "") {
          continue;
        }
        if (typeof val === "string" && val.startsWith("=")) {
          // It's a formula, specify formula string (omitting the first character '=') and cell type
          ws[cellRef] = { t: 'n', f: val.substring(1) };
        } else if (typeof val === "number") {
          ws[cellRef] = { t: 'n', v: val };
        } else if (typeof val === "boolean") {
          ws[cellRef] = { t: 'b', v: val };
        } else {
          ws[cellRef] = { t: 's', v: String(val) };
        }
      }
    }
    return ws;
  };

    const handleDownloadSpreadsheet = () => {
    try {
      const wb = XLSX.utils.book_new();
      const currentQuest = formulaQuests[selectedQuestIdx];

      const wsData = [
        ["SHEETMASTER ACADEMY - ឯកសារអនុវត្តិកិច្ចការ Excel"],
        [],
        ["មេរៀនទី: " + currentQuest.titleKh],
        ["ការពិពណ៌នា: " + currentQuest.descriptionKh],
        [],
        currentQuest.headers,
      ];

      currentQuest.tableData.forEach((row, i) => {
         const rowValues = currentQuest.headers.map((_, colIdx) => {
             const key = Object.keys(row)[colIdx];
             return row[key] !== undefined ? row[key] : "";
         });
         wsData.push(rowValues);
      });

      // Let's add the formula answer row
      wsData.push([]);
      const ansRow = new Array(currentQuest.headers.length).fill("");
      ansRow[0] = "ចម្លើយ (Result) ➡";
      ansRow[ansRow.length - 1] = currentQuest.correctAnswers[0]; 
      wsData.push(ansRow);

      const ws = arrayToSheet(wsData);

      XLSX.utils.book_append_sheet(wb, ws, "អនុវត្តលំហាត់");

      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([wbout], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "លំហាត់_" + currentQuest.id + ".xlsx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      showToast("✓ ទាញយកឯកសារលំហាត់ " + currentQuest.titleKh + " ជោគជ័យ!");
    } catch (e) {
      console.error(e);
      showToast("⚠️ ការទាញយកឯកសារមានកំហុសឆ្គង!");
    }
  };

  // CSV Import States for Employee Management System
  const [employeeInputMode, setEmployeeInputMode] = useState<"manual" | "csv">("manual");
  const [csvFileName, setCsvFileName] = useState<string>("");
  const [parsedEmployees, setParsedEmployees] = useState<any[]>([]);
  const [csvError, setCsvError] = useState<string | null>(null);
  const [isDraggingCsv, setIsDraggingCsv] = useState<boolean>(false);
  const [employeeSearchQuery, setEmployeeSearchQuery] = useState<string>("");

  // 3. Income Expense Auto Automation Sim
  const [transactions, setTransactions] = useState([
    { date: "2026-06-01", desc: "ចំណូលលក់គម្រោងរដ្ឋបាល", type: "income", amount: 1500, category: "គម្រោង" },
    { date: "2026-06-02", desc: "ទិញក្រដាស និងសម្ភារៈការិយាល័យ", type: "expense", amount: 120, category: "រដ្ឋបាល" },
    { date: "2026-06-03", desc: "បង់ថ្លៃអគ្គីសនីប្រចាំខែ", type: "expense", amount: 250, category: "ឧបករណ៍" },
    { date: "2026-06-04", desc: "សេវាប្រឹក្សាយោបល់ Google Sheet", type: "income", amount: 800, category: "សេវាកម្ម" },
    { date: "2026-06-05", desc: "ជួសជុលម៉ាស៊ីនត្រជាក់ការិយាល័យ", type: "expense", amount: 180, category: "រដ្ឋបាល" },
    { date: "2026-06-06", desc: "ចំណូលពីការបង្រៀន Sheets Admin", type: "income", amount: 1200, category: "បណ្ដុះបណ្ដាល" }
  ]);
  const [newTx, setNewTx] = useState({
    desc: "",
    type: "income",
    amount: "",
    category: "រដ្ឋបាល"
  });

  // 4. Telegram Automated Bot Notification Simulation
  const [telegramConfig, setTelegramConfig] = useState({
    botToken: "",
    chatId: "",
    columnsToNotify: ["ឈ្មោះបុគ្គលិក", "ប្រាក់ខែសរុប", "ស្ថានភាព"],
    triggerType: "រាល់ពេលបន្ថែមជួរបុគ្គលិកថ្មី (On Row Added)",
    customMessage: "⚠️ មានការបញ្ចូលបញ្ជីហិរញ្ញវត្ថុថ្មីនៅក្នុង Google Sheets!"
  });
  const [generatedScript, setGeneratedScript] = useState<string>("");
  const [isGeneratingScript, setIsGeneratingScript] = useState<boolean>(false);
  const [telegramLogs, setTelegramLogs] = useState<Array<{time: string, msg: string}>>([
    { time: "10:15 AM", msg: "🔔 ប្រព័ន្ធភ្ជាប់ជោគជ័យ៖ សារសាកល្បង Telegram Bot setup រួចរាល់!" }
  ]);
  const [testMessage, setTestMessage] = useState("");



  // Toast / System updates
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // Initialize script once
  useEffect(() => {
    generatePredefinedScript();
  }, [telegramConfig.botToken, telegramConfig.chatId]);

  // Handle Khmer Riel Tax Calculation
  useEffect(() => {
    // Cambodian standard monthly tax rates for resident physical person
    // 0 to 1,500,000 riels -> 0% D = 0
    // 1,500,001 to 2,000,000 riels -> 5% D = 75,000
    // 2,000,001 to 8,500,000 riels -> 10% D = 175,000
    // 8,500,001 to 12,500,000 riels -> 15% D = 600,000
    // Over 12,500,000 riels -> 20% D = 1,225,000
    
    let rate = 0;
    let deduction = 0;
    const salary = inputRiels;

    if (salary <= 1500000) {
      rate = 0;
      deduction = 0;
    } else if (salary <= 2000000) {
      rate = 5;
      deduction = 75000;
    } else if (salary <= 8500000) {
      rate = 10;
      deduction = 175000;
    } else if (salary <= 12500000) {
      rate = 15;
      deduction = 600000;
    } else {
      rate = 20;
      deduction = 1225000;
    }

    const taxAmount = Math.max(0, (salary * (rate / 100)) - deduction);
    setCalculatedTaxRate(rate);
    setCalculatedTaxAmount(Math.round(taxAmount));
  }, [inputRiels]);

  // Generate Google Apps Script using Template matching standard Telegram requests
  const generatePredefinedScript = () => {
    const token = telegramConfig.botToken || "8273619283:AAE6fH_o9...";
    const chat = telegramConfig.chatId || "-10023456789";
    
    // Dynamically generate code based on configured columns
    const columnsFetchScript = telegramConfig.columnsToNotify.map((col, index) => 
      `  var colData${index+1} = sheet.getRange(row, ${index+1}).getValue(); // ទាញយកទិន្នន័យ: ${col}`
    ).join("\n");

    const columnsMessageScript = telegramConfig.columnsToNotify.map((col, index) => 
      `                     "🔹 ${col}: " + colData${index+1} + "\\n" +`
    ).join("\n");
    
    const script = `/**
 * Google Apps Script សម្រាប់ផ្ញើសារស្វ័យប្រវត្តទៅ Telegram Webhook
 * រៀបចំដោយ៖ Khmer Google Sheets Admin School
 */

var TELEGRAM_BOT_TOKEN = "${token}";
var TELEGRAM_CHAT_ID = "${chat}";

// មុខងារចម្បងដែលដើរនៅពេលមានការកែប្រែ ឬបន្ថែមទិន្នន័យ (${telegramConfig.triggerType})
function sendTelegramNotification(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var range = e.range;
  var row = range.getRow();
  
  // ទាញយកព័ត៌មានពីជួរដែលបានកែប្រែ
${columnsFetchScript}
  
  // រៀបចំសារជាភាសាខ្មែរ
  var khmerMessage = "${telegramConfig.customMessage}\\n" +
                     "━━━━━━━━━━━━━━━━━━\\n" +
${columnsMessageScript}
                     "📅 ផ្ញើចេញពី: Google Sheets (ស្វ័យប្រវត្តិ)\\n" +
                     "━━━━━━━━━━━━━━━━━━";
                     
  // ផ្ញើសារទៅកាន់ Telegram api
  var url = "https://api.telegram.org/bot" + TELEGRAM_BOT_TOKEN + "/sendMessage";
  var payload = {
    "chat_id": TELEGRAM_CHAT_ID,
    "text": khmerMessage,
    "parse_mode": "HTML"
  };
  
  var options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(payload),
    "muteHttpExceptions": true
  };
  
  // បញ្ជូនទិន្នន័យ
  var response = UrlFetchApp.fetch(url, options);
  Logger.log(response.getContentText());
}

// របៀបតំឡើង៖
// ១. ចូលទៅកាន់ Extensions -> Apps Script ក្នុង Google Sheets របស់អ្នក។
// ២. ចម្លងកូដខាងលើដាក់ចូល រួចចុច Save។
// ៣. បង្កើត Triggers (រូបនាឡិកាខាងឆ្វេង) -> បន្ថែម Trigger ជ្រើសរើសមុខងារ "sendTelegramNotification" និង Event "${telegramConfig.triggerType.includes('On Edit') ? 'On edit' : 'On form submit'}"។`;

    setGeneratedScript(script);
  };



  // Handle Sheet Formula Check (Sandbox Interactive)
  // Provide click-to-insert cell reference functionality
  const handleCellClick = (cellRef: string) => {
    setUserFormula(prev => {
      // If empty, auto start with =
      if (!prev) return "=" + cellRef;
      return prev + cellRef;
    });
    // Visual feedback handled by CSS hover/active
  };

  const handleCheckFormula = () => {
    const quest = formulaQuests[selectedQuestIdx];

    // Guest paywall: first GUEST_FREE_LIMIT exercises are free, then must buy.
    if (!isApproved && !guestDone.includes(quest.id) && guestDone.length >= GUEST_FREE_LIMIT) {
      setShowPaywall(true);
      return;
    }

    const cleanedInput = userFormula.trim().replace(/\s+/g, '');
    
    // Find matching correct answers (stripped whitespace)
    const formsCorrect = quest.correctAnswers.map(ans => ans.trim().replace(/\s+/g, ''));
    
    if (formsCorrect.includes(cleanedInput)) {
      setQuestStatus("correct");
      
      // Calculate simulation result
      if (quest.id === "quest-sum") {
        const sum = quest.tableData.reduce((acc, row) => acc + row.salary, 0);
        setSandboxResult(`$${sum}.00`);
      } else if (quest.id === "quest-if") {
        setSandboxResult("$50.00 (បុគ្គលិកទទួលបានប្រាក់បន្ថែម)");
      } else if (quest.id === "quest-countif") {
        setSandboxResult("2 (ថ្ងៃវត្តមាន)");
      }
      
      // Add lesson to completed
      if (!completedLessons.includes(quest.id)) {
        setCompletedLessons([...completedLessons, quest.id]);
      }
      // Track guest usage (persisted so a refresh can't reset the free quota)
      if (!isApproved && !guestDone.includes(quest.id)) {
        const next = [...guestDone, quest.id];
        setGuestDone(next);
        try { localStorage.setItem("gsheet_guest_done", JSON.stringify(next)); } catch { /* ignore */ }
      }
      showToast("🎉 អបអរសាទរ! រូបមន្តរបស់អ្នកត្រឹមត្រូវឥតខ្ចោះ!");
    } else {
      setQuestStatus("incorrect");
      setSandboxResult(null);
      showToast("❌ រូបមន្តមិនត្រូវគ្នាទេ។ លោកអ្នកអាចអានគន្លឹះជំនួយ រួចព្យាយាមម្តងទៀត។");
    }
  };

  // Trigger Mock Telegram Notify
  const handleTriggerTestTelegram = () => {
    const textMsg = testMessage || "🔔 ស្វាគមន៍ពីសាលារដ្ឋបាល Google Sheets! ប្រព័ន្ធដំណើរការល្អឥតខ្ចោះ។";
    const newLog = {
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      msg: `✈️ សារផ្ញើទៅ Telegram៖ "${textMsg}"`
    };
    setTelegramLogs([newLog, ...telegramLogs]);
    setTestMessage("");
    showToast("✓ បានសាកល្បងផ្ញើសារយោង Telegram ជោគជ័យ (ប្រព័ន្ធសាកល្បងក្នុងកម្មវិធី)!");
  };



  // Helper Toast function
  const showToast = (msg: string) => {
    setAlertMessage(msg);
    setTimeout(() => {
      setAlertMessage(null);
    }, 4500);
  };

  // Payroll CRUD
  const addPayrollEmployee = () => {
    if (!newEmployeeName.trim()) {
      showToast("⚠️ សូមបញ្ចូលឈ្មោះបុគ្គលិក");
      return;
    }
    const salary = parseFloat(newEmployeeSalary) || 0;
    const bonus = parseFloat(newEmployeeBonus) || 0;
    
    // Auto Cambodian Tax simulation
    // Let's assume average Riel exchange rate 1$ = 4100 Riels
    const totalSalaryRiel = (salary + bonus) * 4100;
    let rate = 0;
    if (totalSalaryRiel <= 1500000) rate = 0;
    else if (totalSalaryRiel <= 2000000) rate = 5;
    else if (totalSalaryRiel <= 8500000) rate = 10;
    else if (totalSalaryRiel <= 12500000) rate = 15;
    else rate = 20;

    const taxAmountDollars = Math.round((totalSalaryRiel * (rate / 100)) / 4100);
    const netSalary = Math.max(0, (salary + bonus) - taxAmountDollars);

    const newEmp = {
      id: Date.now(),
      name: newEmployeeName,
      baseSalary: salary,
      bonus: bonus,
      taxRate: rate,
      netSalary: netSalary
    };

    setPayrollEmployees([...payrollEmployees, newEmp]);
    
    // Mock Telegram Bot Notification
    setTelegramLogs(prev => [
      {
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        msg: `📢 Sheets Event: បានបន្ថែមឈ្មោះ "${newEmp.name}" ទៅកាន់តារាងគណនាប្រាក់ខែ (ប្រាក់ខែគោល: $${newEmp.baseSalary}, ជាប់ពន្ធ: ${newEmp.taxRate}%)`
      },
      ...prev
    ]);

    setNewEmployeeName("");
    showToast(`✓ បានបន្ថែមបុគ្គលិក "${newEmp.name}" និងគណនាពន្ធស្វ័យប្រវត្តិ!`);
  };

  const removePayrollEmployee = (id: number) => {
    setPayrollEmployees(payrollEmployees.filter(emp => emp.id !== id));
    showToast("✓ បានលុបបុគ្គលិកចេញពីបញ្ជី");
  };

  // Employee Management CRUD
  const handleAddStaff = () => {
    const trimmedId = newStaff.id.trim();
    const trimmedName = newStaff.name.trim();
    const trimmedEmail = newStaff.email.trim();

    if (!trimmedId) {
      showToast("⚠️ សូមបញ្ចូលអត្តសញ្ញាណ ID របស់បុគ្គលិក");
      setShowValidationHelpModal(true);
      return;
    }

    const isDuplicateId = employeeDb.some(
      (emp) => emp.id.trim().toUpperCase() === trimmedId.toUpperCase()
    );
    if (isDuplicateId) {
      showToast(`⚠️ អត្តសញ្ញាណ ID "${trimmedId}" មានរួចហើយនៅក្នុងប្រព័ន្ធ!`);
      setShowValidationHelpModal(true);
      return;
    }

    if (!trimmedName) {
      showToast("⚠️ សូមបំពេញឈ្មោះបុគ្គលិក");
      return;
    }

    if (!trimmedEmail) {
      showToast("⚠️ សូមបំពេញអ៊ីមែលបុគ្គលិក");
      return;
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);
    if (!isValidEmail) {
      showToast("⚠️ អ៊ីមែលមិនត្រឹមត្រូវ! ឧទាហរណ៍៖ user@example.com");
      setShowValidationHelpModal(true);
      return;
    }

    const staffObj = { 
      id: trimmedId, 
      name: trimmedName,
      gender: newStaff.gender,
      role: newStaff.role,
      email: trimmedEmail,
      status: newStaff.status 
    };
    
    const nextDb = [...employeeDb, staffObj];
    setEmployeeDb(nextDb);
    
    // Mock Telegram update log
    setTelegramLogs(prev => [
      {
         time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
         msg: `👥 Database Trigger: បានបញ្ចូលប្រវត្តិបុគ្គលិកថ្មី ${staffObj.name} (${staffObj.role}) ទៅកាន់ឃ្លាំងបញ្ជីទិន្នន័យ។`
      },
      ...prev
    ]);

    // Compute the next default ID
    let nextNum = nextDb.length + 1;
    let nextId = `EMP00${nextNum}`;
    while (nextDb.some(emp => emp.id.trim().toUpperCase() === nextId.toUpperCase())) {
      nextNum++;
      nextId = `EMP00${nextNum}`;
    }

    setNewStaff({
      id: nextId,
      name: "",
      gender: "ស្រី",
      role: "រដ្ឋបាល",
      email: "",
      status: "សកម្ម"
    });
    
    showToast("✓ បានបញ្ចូលបុគ្គលិកថ្មីទៅក្នុង Database សាកល្បង!");
  };

  const handleDeleteStaff = (id: string, name: string) => {
    setEmployeeDb(employeeDb.filter(st => st.id !== id));
    showToast(`✓ បានលុបបុគ្គលិក ${name}`);
  };

  // CSV Parsing & Batch Importing Logic
  const handleCsvParse = (csvText: string) => {
    try {
      setCsvError(null);
      // Split on lines, filter empty lines
      const lines = csvText.split(/\r?\n/).map(line => line.trim()).filter(line => line.length > 0);
      if (lines.length < 2) {
        throw new Error("ឯកសារ CSV ត្រូវតែមានជួរចំនងជើង និងទិន្នន័យបុគ្គលិកយ៉ាងតិច ១ ជួរ។");
      }

      // Match columns
      const headers = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, ''));
      
      const result: any[] = [];
      for (let i = 1; i < lines.length; i++) {
        const rowText = lines[i];
        let values: string[] = [];
        let insideQuote = false;
        let currentVal = "";
        
        for (let charIdx = 0; charIdx < rowText.length; charIdx++) {
          const char = rowText[charIdx];
          if (char === '"' || char === "'") {
            insideQuote = !insideQuote;
          } else if (char === ',' && !insideQuote) {
            values.push(currentVal.trim());
            currentVal = "";
          } else {
            currentVal += char;
          }
        }
        values.push(currentVal.trim());
        
        while (values.length < headers.length) {
          values.push("");
        }
        
        const cleanVal = (index: number, fallback: string = "") => {
          if (index < values.length) {
            return values[index].replace(/^["']|["']$/g, '').trim() || fallback;
          }
          return fallback;
        };

        const name = cleanVal(0, "បុគ្គលិកថ្មី");
        let gender = cleanVal(1, "ស្រី");
        if (gender.toLowerCase().includes("male") || gender.includes("ប្រុស") || gender === "M") {
          gender = "ប្រុស";
        } else {
          gender = "ស្រី";
        }

        let role = cleanVal(2, "រដ្ឋបាល");
        if (role.includes("គណនេយ្យ") || role.toLowerCase().includes("account")) {
          role = "គណនេយ្យ";
        } else if (role.includes("លក់") || role.toLowerCase().includes("sale")) {
          role = "លក់";
        } else if (role.includes("ដឹកនាំ") || role.toLowerCase().includes("logistic") || role.includes("ដឹកជញ្ជូន")) {
          role = "ដឹកនាំ";
        } else {
          role = "រដ្ឋបាល";
        }

        const email = cleanVal(3, `staff.import.${i}@example.com`);
        let status = cleanVal(4, "សកម្ម");
        if (status.includes("វិស្សមកាល") || status.toLowerCase().includes("vacation") || status.toLowerCase().includes("leave")) {
          status = "វិស្សមកាល";
        } else {
          status = "សកម្ម";
        }

        result.push({
          name,
          gender,
          role,
          email,
          status
        });
      }

      if (result.length === 0) {
        throw new Error("មិនអាចទាញយកទិន្នន័យបានទេ! សូមពិនិត្យទម្រង់ CSV របស់អ្នកជាថ្មី។");
      }

      setParsedEmployees(result);
    } catch (err: any) {
      setCsvError(err.message || "ទម្រង់ឯកសារមិនត្រឹមត្រូវឡើយ។");
      setParsedEmployees([]);
    }
  };

  const handleFileUpload = (file: File) => {
    if (!file) return;
    if (!file.name.endsWith('.csv')) {
      setCsvError("សូមជ្រើសរើសតែឯកសារប្រភេទ .csv តែប៉ុណ្ណោះ។");
      setParsedEmployees([]);
      return;
    }
    
    setCsvFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      handleCsvParse(text);
    };
    reader.readAsText(file);
  };

  const handleImportParsedEmployees = () => {
    if (parsedEmployees.length === 0) return;
    
    const startIdx = employeeDb.length + 1;
    const newItems = parsedEmployees.map((emp, index) => ({
      id: `EMP00${startIdx + index}`,
      ...emp
    }));

    setEmployeeDb([...employeeDb, ...newItems]);
    
    setTelegramLogs(prev => [
      {
         time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
         msg: `👥 Database Batch Trigger: បាននាំចូលបុគ្គលិកថ្មីចំនួន ${newItems.length} នាក់ តាមរយៈឯកសារ CSV (${csvFileName}) ជោគជ័យ។`
      },
      ...prev
    ]);

    showToast(`✓ បាននាំចូលបុគ្គលិកទាំង ${newItems.length} នាក់ដោយជោគជ័យ!`);
    setParsedEmployees([]);
    setCsvFileName("");
  };

  const downloadSampleCsv = () => {
    const headers = "ឈ្មោះបុគ្គលិក,ភេទ,ផ្នែកការងារ,អ៊ីមែល,ស្ថានភាព\n";
    const row1 = "វ៉ាន់ ឌី,ប្រុស,រដ្ឋបាល,vandy@example.com,សកម្ម\n";
    const row2 = "សួន ស្រីនី,ស្រី,គណនេយ្យ,sreyny@example.com,សកម្ម\n";
    const row3 = "ពៅ វិសាល,ប្រុស,លក់,visal@example.com,វិស្សមកាល\n";
    const row4 = "ជា សុភ័ក្ត្រ,ស្រី,ដឹកនាំ,sopheak@example.com,សកម្ម";
    
    const blob = new Blob([headers + row1 + row2 + row3 + row4], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "employee_sample_admin.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("✓ ទាញយកឯកសារគំរូ CSV បានជោគជ័យ!");
  };

  // Finance CRUD
  const handleAddTx = () => {
    if (!newTx.desc.trim() || !newTx.amount) {
      showToast("⚠️ សូមបំពេញការពិពណ៌នា និងចំនួនទឹកប្រាក់");
      return;
    }
    const txObj = {
      date: new Date().toISOString().split('T')[0],
      desc: newTx.desc,
      type: newTx.type,
      amount: parseFloat(newTx.amount),
      category: newTx.category
    };

    setTransactions([txObj, ...transactions]);

    // Mock Telegram Log
    const typeIndicator = txObj.type === "income" ? "🟢 ចំណូលថ្មី" : "🔴 ចំណាយថ្មី";
    setTelegramLogs(prev => [
      {
         time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
         msg: `${typeIndicator}៖ ${txObj.desc} ចំនួន $${txObj.amount} (ប្រភេទ: ${txObj.category})`
      },
      ...prev
    ]);

    setNewTx({
      desc: "",
      type: "income",
      amount: "",
      category: "រដ្ឋបាល"
    });
    showToast("✓ បញ្ចូលប្រតិបត្តិការហិរញ្ញវត្ថុថ្មីជោគជ័យ!");
  };

  const handleDeleteTx = (idx: number) => {
    setTransactions(transactions.filter((_, i) => i !== idx));
    showToast("✓ បានលុបប្រតិបត្តិការការិយាល័យ");
  };

  // Finance calculation metrics
  const totalIncome = transactions.filter(t => t.type === "income").reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === "expense").reduce((acc, t) => acc + t.amount, 0);
  const totalBalance = totalIncome - totalExpense;

  // Filtered employees for search & role filter
  const filteredEmployees = employeeDb.filter((st) => {
    const matchesRole = roleFilter === "ទាំងអស់" || st.role === roleFilter;
    if (!employeeSearchQuery.trim()) return matchesRole;
    const query = employeeSearchQuery.toLowerCase().trim();
    return matchesRole && (
      st.name.toLowerCase().includes(query) || 
      st.id.toLowerCase().includes(query)
    );
  });

  const incomeDetails = transactions.filter(t => t.type === "income").reduce((acc, t) => {
     acc[t.category] = (acc[t.category] || 0) + t.amount;
     return acc;
  }, {} as Record<string, number>);
  
  const expenseDetails = transactions.filter(t => t.type === "expense").reduce((acc, t) => {
     acc[t.category] = (acc[t.category] || 0) + t.amount;
     return acc;
  }, {} as Record<string, number>);

  // Pie chart or interactive financial categories data
  const chartData = [
    { name: "ចំណូលសរុប", ទឹកប្រាក់: totalIncome, type: "income", details: incomeDetails },
    { name: "ចំណាយសរុប", ទឹកប្រាក់: totalExpense, type: "expense", details: expenseDetails },
    { name: "សមតុល្យសល់", ទឹកប្រាក់: totalBalance, type: "balance", details: {} }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const total = data.ទឹកប្រាក់;
      
      return (
        <div className="bg-slate-800 text-white p-3 rounded-lg border border-slate-700 shadow-xl min-w-[200px] z-50">
          <p className="font-bold border-b border-slate-600 pb-2 mb-2">{label}</p>
          <p className="text-blue-400 font-mono font-bold mb-3">សរុប (Total): ${total.toFixed(2)}</p>
          
          {data.details && Object.keys(data.details).length > 0 && (
            <div className="space-y-1">
              <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-2">ភាគរយតាមប្រភេទ (Contribution)</p>
              {Object.entries(data.details).map(([cat, amt]: any) => {
                 const percentage = total > 0 ? ((amt / total) * 100).toFixed(1) : "0.0";
                 return (
                   <div key={cat} className="flex justify-between items-center text-xs gap-4">
                     <span className="text-slate-300">{cat}</span>
                     <span className="font-mono text-[11px]">{percentage}% (${amt.toFixed(2)})</span>
                   </div>
                 );
              })}
            </div>
          )}
          
          {data.type === "balance" && (
             <p className="text-[10px] text-slate-400 mt-2">
                យោងតាមទិន្នន័យ (Balance after all expenses)
             </p>
          )}
        </div>
      );
    }
    return null;
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <Loader2 className="w-8 h-8 text-green-600 animate-spin mb-4" />
        <p className="text-slate-500">កំពុងពិនិត្យគណនីរបស់អ្នកពិត... (Loading...)</p>
      </div>
    );
  }

  if (!user && !isGuest) {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-900">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
            <div className="p-8 space-y-6">
              <div className="text-center space-y-2">
                <div className="mx-auto w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4 border border-green-100 shadow-inner">
                  <Database className="w-8 h-8" />
                </div>
                <h1 className="text-2xl font-bold text-slate-800">សាលាខ្មែរ Google Sheets</h1>
                <p className="text-slate-500 text-sm">សូមចូលគណនី Gmail របស់អ្នក</p>
              </div>

              <button 
                onClick={handleGoogleLogin} 
                className="w-full py-3 px-4 bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                ចូលគណនីជាមួយ Google
              </button>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="shrink-0 px-3 text-slate-400 text-xs">ឬ (OR)</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              <button
                onClick={() => setIsGuest(true)}
                className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition-all active:scale-95"
              >
                សាកល្បងជាភ្ញៀវ — ៥ លំហាត់ឥតគិតថ្លៃ
              </button>

              <div className="text-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                 <p className="text-xs text-slate-500">
                    ភ្ញៀវប្រើបាន ៥ លំហាត់ដំបូងឥតគិតថ្លៃ។ ចង់រៀនពេញ? <strong>ទិញឯកសារ $9.9</strong> តាម ABA Payway → ទទួលលេខកូដមាសតាម Telegram → Login ជាមួយ Google។
                 </p>
              </div>
            </div>
          </div>
        </div>
    );
  }

  if (user && !isApproved) {
     return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-900">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 relative">
            
            <div className="p-8 space-y-6">
              <div className="text-center space-y-2">
                <div className="mx-auto w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mb-4 border border-amber-100 shadow-inner">
                  <Lock className="w-8 h-8" />
                </div>
                <h1 className="text-2xl font-bold text-slate-800">ផ្ទៀងផ្ទាត់សិទ្ធិ (Access Code)</h1>
                <p className="text-slate-500 text-sm">សូមបញ្ចូលលេខកូដសម្ងាត់មាសពី Admin ដើម្បីចូលប្រើប្រាស់ប្រព័ន្ធកម្រិតខ្ពស់</p>
              </div>

              <form onSubmit={verifyGoldenCode} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700">លេខកូដសម្ងាត់មាស (Golden Code)</label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="text" 
                      required
                      value={enteredCode}
                      onChange={(e) => setEnteredCode(e.target.value)}
                      placeholder="បញ្ចូលលេខកូដរបស់អ្នក..." 
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition uppercase font-mono"
                    />
                  </div>
                  {codeError && <p className="text-red-500 text-xs mt-1">{codeError}</p>}
                </div>

                <button type="submit" className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold shadow-md shadow-amber-200 transition-all active:scale-95">
                  បញ្ជាក់លេខកូដ (Verify)
                </button>
              </form>
              
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="shrink-0 px-3 text-slate-400 text-xs">ឬ (OR)</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              <a
                href={REANKH_PRODUCT_URL} target="_blank" rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold shadow-md shadow-red-200 transition-all active:scale-95 flex justify-center items-center gap-2"
              >
                 <span className="w-5 h-5 bg-white text-red-600 rounded-full flex items-center justify-center font-bold text-xs shrink-0">$</span>
                 ទិញឯកសារមេរៀន $9.9 (តាម ABA Payway)
              </a>

              <button 
                onClick={handleLogout} 
                className="w-full text-sm text-slate-500 hover:text-slate-700 underline flex justify-center items-center gap-1 mt-4"
              >
                <LogOut className="w-4 h-4" /> ចូលដោយគណនីផ្សេង
              </button>
            </div>
            
            {/* Purchase Modal via Bakong */}
            {showPurchaseModal && (
              <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-in fade-in duration-200 text-center">
                 <div className="bg-white p-6 rounded-2xl shadow-2xl border border-slate-200 w-full relative">
                    <button onClick={() => { setShowPurchaseModal(false); setPurchaseStep(1); }} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                      <X className="w-5 h-5"/>
                    </button>
                    
                    {purchaseStep === 1 && (
                      <div className="space-y-4">
                         <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-2">
                           <span className="text-3xl font-bold">B</span>
                         </div>
                         <h2 className="text-xl font-bold text-slate-800">ទូទាត់ប្រាក់ (Bakong)</h2>
                         <p className="text-sm text-slate-500">ដើម្បីទទួលបានលេខកូដមាស សូមភ្ជាប់គណនី Telegram របស់អ្នកជាមុនសិន។ ប្រព័ន្ធនឹងផ្ញើកូដទៅ Telegram អូតូ។</p>
                         <form onSubmit={(e) => { e.preventDefault(); setPurchaseStep(2); }} className="text-left mt-4">
                            <label className="text-xs font-bold text-slate-600 mb-1 block">Telegram Username ឬ លេខទូរស័ព្ទ</label>
                            <input 
                              required 
                              placeholder="@sokhan_telegram" 
                              value={telegramUsername}
                              onChange={(e) => setTelegramUsername(e.target.value)}
                              className="w-full border border-slate-200 p-2.5 rounded-lg mb-4 text-sm font-mono"
                            />
                            <button type="submit" className="w-full bg-slate-800 hover:bg-slate-900 text-white p-2.5 rounded-lg font-bold">បន្ទាប់ (Next)</button>
                         </form>
                      </div>
                    )}
                    
                    {purchaseStep === 2 && (
                      <div className="space-y-4">
                        <div className="text-xl font-bold text-slate-800">ស្កែនដើម្បីទូទាត់ (Scan to Pay)</div>
                        <div className="bg-slate-100 w-48 h-48 mx-auto rounded-xl flex items-center justify-center border-2 border-dashed border-slate-300">
                          <Activity className="w-10 h-10 text-slate-400 opacity-50" />
                          <span className="absolute text-slate-400 text-xs font-bold mt-16">(Mock QR Code)</span>
                        </div>
                        <p className="font-bold text-lg text-red-600">$10.00</p>
                        <p className="text-xs text-slate-500">គណនី: KHQR_MOCK_ACCOUNT<br/>ឈ្មោះ: សាលាខ្មែរ Google Sheets</p>
                        <button onClick={simulateBakongPaymentAndSendCode} className="w-full bg-red-600 hover:bg-red-700 text-white p-2.5 rounded-lg font-bold animate-pulse shadow-md">
                          អ្នកប្រើប្រាស់បានស្កែនរួចរាល់ (Simulate Paid)
                        </button>
                      </div>
                    )}

                    {purchaseStep === 3 && (
                      <div className="space-y-4 py-8">
                         <Loader2 className="w-12 h-12 text-red-500 animate-spin mx-auto"/>
                         <p className="font-bold text-slate-600">កំពុងផ្ទៀងផ្ទាត់ធនាគារ...</p>
                      </div>
                    )}

                    {purchaseStep === 4 && (
                      <div className="space-y-4">
                         <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                           <CheckCircle className="w-8 h-8" />
                         </div>
                         <h2 className="text-xl font-bold text-slate-800">ទូទាត់ជោគជ័យ!</h2>
                         <p className="text-sm text-slate-500">ប្រព័ន្ធបានបញ្ចូនកូដចូលទៅកាន់ Telegram របស់អ្នកដោយស្វ័យប្រវត្តិ។</p>
                         
                         <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl text-left mt-4 relative overflow-hidden">
                            <div className="flex items-center gap-2 mb-2">
                               <Send className="w-5 h-5 text-blue-500 shrink-0"/>
                               <span className="font-bold text-blue-800 text-sm">សារពី Telegram Bot</span>
                            </div>
                            <p className="text-xs text-blue-700 mb-2">សួស្តី នេះគឺជាលេខកូដមាសរបស់អ្នក សូមបញ្ជូលក្នុងកម្មវិធីដើម្បីប្រើប្រាស់៖</p>
                            <div className="bg-white p-2 rounded text-center border border-blue-100 font-bold font-mono tracking-widest text-lg text-slate-800">
                               {generatedPurchasedCode}
                            </div>
                         </div>
                         
                         <button onClick={() => {
                           setEnteredCode(generatedPurchasedCode);
                           setShowPurchaseModal(false);
                           setPurchaseStep(1);
                         }} className="w-full bg-green-600 hover:bg-green-700 text-white p-2.5 rounded-lg font-bold shadow-md mt-4">
                           ថតចម្លង និង បញ្ចូលកូដ (Use Code)
                         </button>
                      </div>
                    )}
                 </div>
              </div>
            )}
            
          </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col text-slate-900 text-[15px]" id="app-root">
      
      {/* Alert toast notification */}
      {alertMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-lg shadow-xl flex items-center gap-3 border border-slate-700 animate-bounce">
          <Info className="text-blue-400 w-5 h-5 shrink-0" />
          <span className="text-xs font-semibold">{alertMessage}</span>
        </div>
      )}

      {/* Paywall — guest reached the free limit (or tapped Buy) */}
      {showPaywall && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowPaywall(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 space-y-4 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowPaywall(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto"><Lock className="w-8 h-8" /></div>
            <h2 className="text-xl font-bold text-slate-800 text-center">ចង់រៀនបន្តពេញលេញ?</h2>
            <p className="text-sm text-slate-500 text-center">
              ភ្ញៀវប្រើបាន ៥ លំហាត់ឥតគិតថ្លៃ។ ដើម្បីបន្ត សូមទិញឯកសារមេរៀន។ បន្ទាប់ពីបង់ប្រាក់តាម ABA Payway ជោគជ័យ ប្រព័ន្ធផ្ញើ​លេខកូដ​មាស​ឲ្យ​អ្នក​តាម Telegram។
            </p>
            <a href={REANKH_PRODUCT_URL} target="_blank" rel="noopener noreferrer" className="w-full py-3 px-4 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold text-center block transition-all active:scale-95">
              ទិញឯកសារមេរៀន $9.9 (ABA Payway)
            </a>
            <button onClick={() => { setShowPaywall(false); setIsGuest(false); }} className="w-full py-2.5 text-sm text-slate-600 hover:text-slate-800 font-semibold flex items-center justify-center gap-2">
              <img src="https://www.google.com/favicon.ico" alt="" className="w-4 h-4" /> មានកូដរួចហើយ? ចូល Google + បញ្ចូលកូដ
            </button>
          </div>
        </div>
      )}

      {/* Main Navigation Bar */}
      <nav id="app-navbar" className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 shadow-sm z-30 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-green-600 rounded flex items-center justify-center shadow">
            <FileSpreadsheet className="text-white w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight text-slate-800 block leading-tight">SheetMaster Admin</span>
            <span className="text-[10px] text-green-600 font-bold uppercase tracking-wider">សាលារៀនរដ្ឋបាលស្វ័យប្រវត្ត</span>
          </div>
        </div>

        {/* Links representing user guidelines layout */}
        <div className="hidden md:flex gap-4 text-xs font-semibold text-slate-600 flex-wrap">
          <button 
            onClick={() => setActiveTab("learn-formulas")} 
            className={`px-3 py-1.5 rounded transition ${activeTab === "learn-formulas" ? "text-green-600 bg-green-50" : "hover:text-slate-900"}`}
          >
            រៀនរូបមន្ត
          </button>
          <button 
            onClick={() => setActiveTab("practice-easy")} 
            className={`px-3 py-1.5 rounded transition ${activeTab === "practice-easy" ? "text-green-600 bg-green-50" : "hover:text-slate-900"}`}
          >
            អនុវត្តលំហាត់កម្រិតទាប
          </button>
          <button 
            onClick={() => setActiveTab("practice-medium")} 
            className={`px-3 py-1.5 rounded transition ${activeTab === "practice-medium" ? "text-green-600 bg-green-50" : "hover:text-slate-900"}`}
          >
            មធ្យម
          </button>
          <button 
            onClick={() => setActiveTab("practice-advanced")} 
            className={`px-3 py-1.5 rounded transition ${activeTab === "practice-advanced" ? "text-green-600 bg-green-50" : "hover:text-slate-900"}`}
          >
            កម្រិតខ្ពស់
          </button>
          <button 
            onClick={() => setActiveTab("prompt-app-script")} 
            className={`px-3 py-1.5 rounded transition ${activeTab === "prompt-app-script" ? "text-green-600 bg-green-50" : "hover:text-slate-900"}`}
          >
            កម្រិតប្រើ Prompt សរសេរ App Script
          </button>
        </div>

        <div className="flex items-center gap-3">
          {isAdmin && (
            <button 
              onClick={() => setActiveTab("admin")} 
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all active:scale-95 ${activeTab === 'admin' ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 shadow-sm border border-slate-200'}`}
            >
              <UserCog className="w-4 h-4" />
              មុខងារ Admin
            </button>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 bg-red-50 text-red-600 px-3 py-2 rounded-lg text-xs font-bold hover:bg-red-100 transition-all active:scale-95 border border-red-100"
              title="ចាកចេញ (Logout)"
            >
              <LogOut className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleGoogleLogin}
              className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-2 rounded-lg text-xs font-bold hover:bg-green-100 transition-all active:scale-95 border border-green-100"
            >
              <img src="https://www.google.com/favicon.ico" alt="" className="w-4 h-4" /> ចូល (Login)
            </button>
          )}
        </div>
      </nav>

      {/* Guest banner — free-tier progress + buy */}
      {!isApproved && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 md:px-6 py-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs">
          <span className="text-amber-800 font-semibold">
            🎁 ភ្ញៀវ៖ ប្រើបាន {Math.min(guestDone.length, GUEST_FREE_LIMIT)}/{GUEST_FREE_LIMIT} លំហាត់ឥតគិតថ្លៃ
          </span>
          <button onClick={() => setShowPaywall(true)} className="font-bold text-amber-700 underline hover:text-amber-900">
            ទិញឯកសារពេញ $9.9 →
          </button>
        </div>
      )}

      <div className="flex-1 max-w-[1400px] w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6" id="primary-layout">
        
        {/* Left main work area */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Dashboard Hub Header */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1">
              <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider">
                កម្មវិធីបណ្ដុះបណ្ដាលពិសេស
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold leading-tight text-slate-900">
                រៀនបង្កើតប្រព័ន្ធរដ្ឋបាល <span className="text-blue-600">Google Sheets ស្វ័យប្រវត្តិ</span>
              </h1>
              <p className="text-slate-500 text-xs md:text-sm">
                រៀនគណនាប្រាក់ខែ, បង្កើត Database បុគ្គលិក, កំណត់ចំណូលចំណាយ និងស្វែងយល់ពីរបៀបភ្ជាប់សារស្វ័យប្រវត្តតាម Apps Script ទៅ Telegram Bot។
              </p>
            </div>

          </div>

          {/* Quick Tab switcher for responsive/mobile layouts */}
          <div className="flex md:hidden bg-white p-1 rounded-xl border border-slate-200 gap-1 overflow-x-auto whitespace-nowrap scrollbar-none">
            <button onClick={() => setActiveTab("learn-formulas")} className={`px-4 py-2 rounded-lg text-xs font-semibold ${activeTab === "learn-formulas" ? "bg-slate-900 text-white" : "text-slate-600"}`}>រៀនរូបមន្ត</button>
            <button onClick={() => setActiveTab("practice-easy")} className={`px-4 py-2 rounded-lg text-xs font-semibold ${activeTab === "practice-easy" ? "bg-slate-900 text-white" : "text-slate-600"}`}>កម្រិតទាប</button>
            <button onClick={() => setActiveTab("practice-medium")} className={`px-4 py-2 rounded-lg text-xs font-semibold ${activeTab === "practice-medium" ? "bg-slate-900 text-white" : "text-slate-600"}`}>មធ្យម</button>
            <button onClick={() => setActiveTab("practice-advanced")} className={`px-4 py-2 rounded-lg text-xs font-semibold ${activeTab === "practice-advanced" ? "bg-slate-900 text-white" : "text-slate-600"}`}>កម្រិតខ្ពស់</button>
            <button onClick={() => setActiveTab("prompt-app-script")} className={`px-4 py-2 rounded-lg text-xs font-semibold ${activeTab === "prompt-app-script" ? "bg-slate-900 text-white" : "text-slate-600"}`}>Prompt App Script</button>
          </div>

          {/* TAB CONTENT: CATEGORY TABS & EXERCISE GAME SANDBOX */}
          {["learn-formulas", "practice-easy", "practice-medium", "practice-advanced", "prompt-app-script"].includes(activeTab) && (
            <div className="space-y-6 animate-fade-in" id="overview-content">
              
              {/* Feature Grid of Lessons */}
              <div>
                <h2 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-green-600" />
                  {activeTab === "learn-formulas" && "រៀនរូបមន្ត"}
                  {activeTab === "practice-easy" && "អនុវត្តលំហាត់កម្រិតទាប"}
                  {activeTab === "practice-medium" && "អនុវត្តលំហាត់កម្រិតមធ្យម"}
                  {activeTab === "practice-advanced" && "អនុវត្តលំហាត់កម្រិតខ្ពស់"}
                  {activeTab === "prompt-app-script" && "កម្រិតប្រើ Prompt សរសេរ App Script"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(() => {
                    let filteredOptions = lessonsList;
                    if (activeTab === "learn-formulas") {
                      filteredOptions = lessonsList.filter(l => ["basic-formulas", "text-functions", "conditional-logic", "vlookup-index", "advanced-formulas", "data-validation"].includes(l.id));
                    } else if (activeTab === "practice-easy") {
                      filteredOptions = lessonsList.filter(l => l.difficulty === "ងាយស្រួល" && !["basic-formulas"].includes(l.id) && !l.id.startsWith("tutorial-"));
                    } else if (activeTab === "practice-medium") {
                      filteredOptions = lessonsList.filter(l => l.difficulty === "មធ្យម" && !["text-functions", "conditional-logic", "data-validation", "telegram"].includes(l.id) && !l.id.startsWith("tutorial-"));
                    } else if (activeTab === "practice-advanced") {
                      filteredOptions = lessonsList.filter(l => l.difficulty === "កម្រិតខ្ពស់" && !["vlookup-index", "advanced-formulas"].includes(l.id) && !l.id.startsWith("tutorial-"));
                    } else if (activeTab === "prompt-app-script") {
                      filteredOptions = lessonsList.filter(l => l.id.startsWith("tutorial-") || l.id === "telegram");
                    }
                    
                    return filteredOptions;
                  })().map((lesson) => (
                    <div 
                      key={lesson.id} 
                      onClick={() => {
                        // For the sandbox ones (id contains 'formulas' or is a specific module), we can scroll to the sandbox
                        const isSandbox = lesson.id === "basic-formulas" || 
                                          lesson.id === "text-functions" || 
                                          lesson.id === "conditional-logic" || 
                                          lesson.id === "vlookup-index" ||
                                          lesson.id.startsWith("practice-");
                        if (isSandbox) {
                          // Select an appropriate quest based on the lesson
                          if (lesson.id === "basic-formulas") setSelectedQuestIdx(0);
                          else if (lesson.id === "text-functions") setSelectedQuestIdx(10);
                          else if (lesson.id === "conditional-logic") setSelectedQuestIdx(6);
                          else if (lesson.id === "vlookup-index") setSelectedQuestIdx(9);
                          else if (lesson.id === "practice-sparkline") setSelectedQuestIdx(50);
                          else if (lesson.id === "practice-payroll") setSelectedQuestIdx(51);
                          else if (lesson.id === "practice-attendance") setSelectedQuestIdx(52);
                          else if (lesson.id === "practice-filter-absent") setSelectedQuestIdx(53);
                          else if (lesson.id === "practice-age-group") setSelectedQuestIdx(54);

                          document.getElementById("sandbox-container")?.scrollIntoView({ behavior: 'smooth' });
                        } else if (lesson.id?.startsWith("tutorial-") || lesson.id === "data-validation" || lesson.id === "advanced-formulas") {
                          setSelectedTutorialId(lesson.id);
                          setActiveTab("tutorial");
                        } else {
                          setActiveTab(lesson.id);
                        }
                      }}
                      className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-green-300 transition cursor-pointer flex flex-col justify-between group"
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-700 group-hover:bg-green-100 group-hover:text-green-700 transition">
                            {lesson.icon === "Coins" && <Coins className="w-5 h-5" />}
                            {lesson.icon === "Users" && <Users className="w-5 h-5" />}
                            {lesson.icon === "FileChartLine" && <TrendingUp className="w-5 h-5" />}
                            {lesson.icon === "Send" && <Send className="w-5 h-5" />}
                            {lesson.icon === "Sparkles" && <Sparkles className="w-5 h-5 text-amber-500" />}
                            {lesson.icon === "Calculator" && <Calculator className="w-5 h-5" />}
                            {lesson.icon === "Type" && <Type className="w-5 h-5" />}
                            {lesson.icon === "Filter" && <Filter className="w-5 h-5" />}
                            {lesson.icon === "Search" && <Search className="w-5 h-5" />}
                            {lesson.icon === "Database" && <Database className="w-5 h-5" />}
                            {lesson.icon === "BookOpen" && <BookOpen className="w-5 h-5" />}
                            {lesson.icon === "FileText" && <FileText className="w-5 h-5" />}
                            {lesson.icon === "ShieldCheck" && <CheckCircle className="w-5 h-5" />}
                            {lesson.icon === "Terminal" && <Terminal className="w-5 h-5 text-indigo-500" />}
                            {lesson.icon === "Layout" && <Layout className="w-5 h-5 text-sky-500" />}
                            {lesson.icon === "Mail" && <Mail className="w-5 h-5 text-red-500" />}
                            {lesson.icon === "GraduationCap" && <GraduationCap className="w-5 h-5 text-emerald-500" />}
                            {lesson.icon === "FileSignature" && <FileSignature className="w-5 h-5 text-purple-500" />}
                            {lesson.icon === "Globe" && <Globe className="w-5 h-5 text-blue-500" />}
                            {lesson.icon === "Boxes" && <Boxes className="w-5 h-5 text-amber-600" />}
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            lesson.difficulty === "ងាយស្រួល" ? "bg-emerald-50 text-emerald-700" :
                            lesson.difficulty === "មធ្យម" ? "bg-yellow-50 text-yellow-700" : "bg-red-50 text-red-700"
                          }`}>
                            {lesson.difficulty}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800 text-[15px]">{lesson.titleKh}</h3>
                          <p className="text-[11px] text-slate-400 font-medium font-mono">{lesson.titleEn}</p>
                          <p className="text-slate-600 text-xs mt-2 line-clamp-2 leading-relaxed">{lesson.descriptionKh}</p>
                        </div>
                      </div>
                      <div className="pt-4 flex items-center justify-between border-t border-slate-100 mt-4 text-[11px] font-semibold text-slate-500">
                        <span>រយៈពេល៖ {lesson.duration}</span>
                        <span className="text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          ចូលអនុវត្ត <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* INTERACTIVE FORMULA LAB / SIMULATION GAME */}
              {activeTab === "learn-formulas" && (
              <div id="sandbox-container" className="bg-slate-900 text-white rounded-2xl border border-emerald-900/50 shadow-[0_0_20px_rgba(16,185,129,0.1)] overflow-hidden relative">
                {/* AI Era glowing background blur */}
                <div className="absolute top-0 right-0 p-32 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="bg-slate-850 px-5 py-4 border-b border-slate-800 flex flex-col gap-3 relative z-10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                      <span className="text-[11px] text-slate-400 font-mono ml-2">ai_formula_assistant.xlsx - Interactive Learning Space</span>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-3">
                    <div className="relative flex-grow">
                      <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input 
                        type="text" 
                        placeholder="ស្វែងរកលំហាត់ / រូបមន្ត (ឧ. SUM, ប្រាក់ខែ)..." 
                        value={questSearchQuery}
                        onChange={(e) => setQuestSearchQuery(e.target.value)}
                        className="w-full bg-slate-950 text-slate-200 text-xs rounded-lg pl-9 pr-3 py-2 border border-slate-700 outline-none focus:border-green-500"
                      />
                    </div>
                    <div className="flex bg-slate-800 rounded-lg border border-slate-700 max-w-full md:max-w-[300px] shrink-0">
                      <select
                        value={selectedQuestIdx}
                        onChange={(e) => {
                          setSelectedQuestIdx(Number(e.target.value));
                          setUserFormula("");
                          setQuestStatus("idle");
                          setSandboxResult(null);
                        }}
                        className="w-full bg-slate-800 text-slate-200 text-xs font-bold outline-none border-none rounded-lg px-3 py-2 cursor-pointer focus:ring-2 focus:ring-green-500 appearance-none"
                        style={{ backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 0.5rem center", backgroundSize: "1em", paddingRight: "2rem" }}
                      >
                        {formulaQuests
                          .map((quest, originalIdx) => ({ quest, originalIdx }))
                          .filter(({ quest }) => 
                            questSearchQuery === "" || 
                            quest.titleKh.toLowerCase().includes(questSearchQuery.toLowerCase()) || 
                            (quest.descriptionKh && quest.descriptionKh.toLowerCase().includes(questSearchQuery.toLowerCase()))
                          )
                          .map(({ quest, originalIdx }) => (
                          <option key={quest.id} value={originalIdx}>
                            {quest.titleKh}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  {/* Google Sheets Link integration banner */}
                  <div className="bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-800/50 p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <h4 className="text-xs font-black text-emerald-400 uppercase tracking-wide">
                          សន្លឹកកិច្ចការគំរូ និងអនុវត្តលើ Google Sheets
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed max-w-[580px]">
                        ប្អូនៗចង់អនុវត្តផ្តាល់នៅលើកម្មវិធី Google Sheets ពិតប្រាកដមែនទេ? យើងបានរៀបចំ <span className="text-emerald-300 font-bold">តារាងកិច្ចការគំរូរួចជាស្រេច</span> ដែលបង្កប់ដោយសន្លឹកកិច្ចការពីរ៖ <strong>Sheet មួយមានចម្លើយ និងរូបមន្តគំរូ</strong> រួចជាស្រេច និង <strong>Sheet មួយទៀតជាតារាងទទេ</strong> សម្រាប់សិស្សហ្វឹកហាត់ដោយខ្លួនឯង!
                      </p>
                    </div>
                    <button
                      onClick={() => setShowGoogleSheetsModal(true)}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-4 py-2.5 rounded-lg border border-emerald-500 transition duration-150 flex items-center gap-1.5 shrink-0 shadow-lg active:scale-95 cursor-pointer"
                      id="open-google-sheets-modal-btn"
                    >
                      <FileSpreadsheet className="w-4 h-4 text-white" />
                      ភ្ជាប់ទៅ Google Sheets 📊
                    </button>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-md font-bold text-green-400">
                      {formulaQuests[selectedQuestIdx].titleKh}
                    </h3>
                    <p className="text-xs text-slate-300">
                      {formulaQuests[selectedQuestIdx].descriptionKh}
                    </p>
                  </div>

                  {/* The Mock spreadsheet UI container representing professional training */}
                  <div className="bg-slate-950 rounded-xl border border-slate-800 p-2 overflow-x-auto">
                    <table className="w-full text-xs text-left text-slate-300 border-collapse">
                      <thead className="select-none">
                        {/* Excel MOCK columns: A, B, C... */}
                        <tr className="bg-slate-800 text-slate-400 text-[10px] font-mono">
                          <th className="p-0.5 border-r border-b border-slate-700 bg-slate-800 w-6 text-center text-slate-500 text-[9px]">
                            {/* Empty corner */}
                          </th>
                          {formulaQuests[selectedQuestIdx].headers.map((_, i) => (
                            <th key={i} className="p-1 border-r border-b border-slate-700 bg-slate-800 text-center font-bold tracking-widest min-w-[100px]">
                              {String.fromCharCode(65 + i)}
                            </th>
                          ))}
                        </tr>
                        {/* Actual headers */}
                        <tr className="bg-slate-900 text-slate-400 text-[10px] uppercase tracking-wider font-mono">
                          <th className="p-0.5 border-r border-b border-slate-700 bg-slate-800 text-center font-bold text-slate-500 select-none text-[9px]">1</th>
                          {formulaQuests[selectedQuestIdx].headers.map((h, i) => (
                            <th key={i} className="p-2 border-r border-b border-slate-800 text-left">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {formulaQuests[selectedQuestIdx].tableData.map((row: any, rIdx: number) => (
                          <tr key={rIdx} className="border-b border-slate-900 bg-slate-950/50 hover:bg-slate-900/30">
                            <td className="p-0.5 border-r border-slate-700 bg-slate-800 text-center font-mono text-[9px] text-slate-500 font-bold select-none">
                              {rIdx + 2}
                            </td>
                            {Object.keys(row).map((k, colIdx) => {
                              const cellRef = `${String.fromCharCode(65 + colIdx)}${rIdx + 2}`;
                              return (
                                <td 
                                  key={colIdx} 
                                  onClick={() => handleCellClick(cellRef)}
                                  className="p-2 border-r border-slate-900 font-mono cursor-cell hover:bg-emerald-900/30 hover:border-emerald-500/50 hover:text-emerald-300 transition-colors relative group select-none"
                                  title={`ចុចដើម្បីបញ្ចូល ${cellRef}`}
                                >
                                  {k === 'salary' || k === 'bonus' ? `$${row[k]}` : row[k]}
                                  <span className="absolute inset-0 border border-transparent group-hover:border-emerald-400/50 pointer-events-none rounded-[1px] shadow-[inset_0_0_8px_rgba(52,211,153,0.1)]"></span>
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                        {/* Target Cell Row */}
                        <tr className="bg-green-950/20">
                          <td className="p-0.5 border-r border-slate-700 bg-slate-800 text-center font-mono text-[9px] text-slate-500 font-bold select-none">
                            {formulaQuests[selectedQuestIdx].tableData.length + 2}
                          </td>
                          {formulaQuests[selectedQuestIdx].headers.map((_, colIdx) => {
                             if (colIdx === 0) {
                               return <td key={colIdx} className="p-2 border-r border-slate-900 font-bold text-green-400 font-mono text-right">សរុប (Result) ➡</td>
                             }
                             if (colIdx === formulaQuests[selectedQuestIdx].headers.length - 1) {
                               return (
                                 <td key={colIdx} className="p-2 font-mono font-bold text-green-400 bg-green-950/30 relative">
                                  {sandboxResult || (
                                    <span className="text-slate-500 animate-pulse bg-slate-900 px-2 py-0.5 rounded text-[11px]">
                                      {formulaQuests[selectedQuestIdx].targetCell}
                                    </span>
                                  )}
                                  {/* Drag Fill Handle (Visual only) */}
                                  {sandboxResult && (
                                    <div 
                                      className="absolute -right-[3px] -bottom-[3px] w-2 h-2 bg-blue-500 border-[1px] border-white cursor-crosshair hover:scale-125 transition-transform" 
                                      title="អូសដើម្បីអនុវត្តរូបមន្ត (Drag to fill)"
                                    />
                                  )}
                                 </td>
                               );
                             }
                             return <td key={colIdx} className="p-2 border-r border-slate-900 text-slate-500 italic">—</td>
                          })}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Animated click-to-insert tip */}
                  <div className="relative overflow-hidden bg-gradient-to-r from-emerald-950/40 via-teal-900/20 to-slate-900 border border-emerald-800/40 rounded-xl p-3 flex items-start gap-3 shadow-lg group">
                    <div className="absolute inset-0 bg-emerald-500/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
                    <div className="relative z-10 flex shrink-0 items-center justify-center bg-emerald-950 border border-emerald-800 rounded-lg w-8 h-8">
                       <span className="text-lg animate-bounce drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]">👆</span>
                    </div>
                    <div className="relative z-10">
                      <p className="text-[11.5px] text-emerald-100/90 leading-relaxed font-sans mt-0.5">
                        <strong className="text-emerald-400 font-extrabold tracking-wide">គន្លឹះឆ្លាតវៃ៖</strong> លោកអ្នកអាចយកម៉ៅ <span className="inline-flex items-center text-emerald-300 font-bold bg-emerald-900/40 px-1.5 py-0.5 rounded border border-emerald-700/50 cursor-crosshair group-hover:bg-emerald-800/50 transition-colors">ចុចលើក្រឡាណាមួយ <MousePointerClick className="w-3 h-3 ml-1 text-emerald-400 animate-pulse" /></span> ដើម្បីបញ្ចូលទីតាំង (ឧ. C2) ទៅក្នុងរូបមន្តដោយស្វ័យប្រវត្តិ!
                      </p>
                    </div>
                  </div>

                  {/* Formula typing arena */}
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex flex-col md:flex-row gap-3">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-[11px] font-mono text-slate-400">
                            សរសេររូបមន្ត Google Sheet (ចាប់ផ្ដើមដោយសញ្ញា = )
                          </label>
                          <button
                            onClick={() => setShowFormulaExamples(!showFormulaExamples)}
                            className="text-[10px] text-sky-400 hover:text-sky-300 font-bold flex items-center gap-1 transition-colors"
                            title="បង្ហាញឧទាហរណ៍រូបមន្តទូទៅ (Show common formula examples)"
                          >
                            <Lightbulb className="w-3 h-3" />
                            បង្ហាញឧទាហរណ៍ (Examples)
                          </button>
                        </div>
                        <div className="relative flex items-center">
                          <input
                            type="text"
                            value={userFormula}
                            onChange={(e) => setUserFormula(e.target.value)}
                            placeholder="ឧទាហរណ៍៖ =SUM(C2:C6)"
                            className={`w-full bg-slate-950 text-white font-mono rounded px-3 py-2 pr-10 text-sm border focus:outline-none transition-colors ${
                               checkFormulaSyntax(userFormula) ? 'border-red-500 focus:border-red-500' : 'border-slate-700 focus:border-green-500'
                            }`}
                          />
                          <button
                            onClick={() => {
                              if (userFormula) {
                                navigator.clipboard.writeText(userFormula);
                                showToast("✓ បានចម្លងរូបមន្ត!");
                              }
                            }}
                            className="absolute right-2 text-slate-400 hover:text-white transition"
                            title="ចម្លងរូបមន្ត (Copy formula)"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                        {checkFormulaSyntax(userFormula) && (
                          <div className="text-red-400 text-[10px] mt-1.5 flex items-start gap-1 animate-fade-in font-mono">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            {checkFormulaSyntax(userFormula)}
                          </div>
                        )}
                      </div>
                      <div className="flex items-end justify-end shrink-0 mt-2 md:mt-0">
                        <button
                          onClick={handleCheckFormula}
                          disabled={!!checkFormulaSyntax(userFormula)}
                          className={`w-full md:w-auto text-white font-extrabold text-xs px-6 py-2.5 rounded shadow-lg transition duration-150 active:scale-95 flex items-center justify-center gap-1 ${
                            checkFormulaSyntax(userFormula) ? 'bg-slate-700 cursor-not-allowed opacity-50' : 'bg-green-600 hover:bg-green-500'
                          }`}
                        >
                          ផ្ទៀងផ្ទាត់រូបមន្ត 📊
                        </button>
                      </div>
                    </div>

                    {showFormulaExamples && (
                       <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 animate-fade-in text-[11px]">
                         <h4 className="text-slate-300 font-bold mb-2 flex items-center gap-1.5">
                           <Lightbulb className="w-4 h-4 text-amber-400" /> ឧទាហរណ៍រូបមន្តទូទៅ (Common Formulas)
                         </h4>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-400 font-mono">
                           <div className="flex items-start gap-2">
                             <span className="text-emerald-400 bg-emerald-400/10 px-1 py-0.5 rounded shrink-0">=SUM(A1:A5)</span>
                             <span className="text-slate-500 leading-tight">បូកសរុបតម្លៃពី A1 ដល់ A5</span>
                           </div>
                           <div className="flex items-start gap-2">
                             <span className="text-blue-400 bg-blue-400/10 px-1 py-0.5 rounded shrink-0">=IF(C2&gt;50,"Yes","No")</span>
                             <span className="text-slate-500 leading-tight">បើ C2 ធំជាង 50 បង្ហាញ "Yes" បើអត់ "No"</span>
                           </div>
                           <div className="flex items-start gap-2">
                             <span className="text-purple-400 bg-purple-400/10 px-1 py-0.5 rounded shrink-0">=VLOOKUP(A2,B2:D10,2,0)</span>
                             <span className="text-slate-500 leading-tight">ស្វែងរកទិន្នន័យពីតារាង (ពិតប្រាកដ)</span>
                           </div>
                           <div className="flex items-start gap-2">
                             <span className="text-amber-400 bg-amber-400/10 px-1 py-0.5 rounded shrink-0">=COUNTIF(B2:B10,"វត្តមាន")</span>
                             <span className="text-slate-500 leading-tight">រាប់ចំនួនក្រឡាដែលមានពាក្យ "វត្តមាន"</span>
                           </div>
                         </div>
                       </div>
                    )}

                    {/* AI Co-pilot Assistance Area */}
                    <div className="flex flex-col md:flex-row gap-2 relative z-10">
                       <div className="flex-1 bg-indigo-950/40 border border-indigo-900/50 p-3 rounded-lg text-xs leading-relaxed text-indigo-200 flex items-start gap-2 shadow-[inset_0_0_10px_rgba(99,102,241,0.05)]">
                         <span className="bg-gradient-to-r from-indigo-400 to-emerald-400 text-transparent bg-clip-text text-sm shrink-0">✨</span>
                         <div>
                           <span className="font-bold text-indigo-300">AI Co-pilot: </span>
                           {formulaQuests[selectedQuestIdx].helperKh}
                           <div className="mt-1 text-[10.5px] text-indigo-400/80 italic">អ្នកអាចសរសេរតាមន័យនេះ ឬចុចលើក្រឡាទីតាំងខាងលើ ដើម្បីជ្រើសរើសទីតាំងដោយស្វ័យប្រវត្តិ។</div>
                         </div>
                       </div>
                       

                    </div>

                    {questStatus === "correct" && (
                      <div className="bg-emerald-950/40 border border-emerald-900/60 p-3 rounded-lg text-xs text-emerald-300 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>អស្ចារ្យណាស់ប្អូន! រូបមន្តពិតជាត្រឹមត្រូវ ហើយតម្លៃគណនាគឺ {sandboxResult}។</span>
                      </div>
                    )}

                    {questStatus === "incorrect" && (
                      <div className="bg-red-950/40 border border-red-900/60 p-3 rounded-lg text-xs text-red-300 flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                        <span>រូបមន្តខុសហើយ ឬមិនទាន់ឆ្លើយតបត្រូវនឹងទម្រង់។ សូមពិនិត្យផ្ទៀងផ្ទាត់ម្តងទៀត!</span>
                      </div>
                    )}

                    {/* Apps Script Generation Block */}
                    <div className="mt-4 bg-emerald-950/20 border border-emerald-900/60 rounded-xl overflow-hidden shadow-sm">
                      <div className="bg-emerald-900/40 px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-emerald-900/60 transition" onClick={() => setShowAppScriptInline(!showAppScriptInline)}>
                        <h4 className="font-bold text-emerald-300 text-[11px] sm:text-xs flex items-center gap-2">
                          <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                          កូដ Apps Script បង្កើត Google Sheet សម្រាប់លំហាត់នេះ
                        </h4>
                        <span className="text-emerald-500 text-xs text-opacity-80 font-mono font-bold bg-emerald-950/50 px-2 py-0.5 rounded">
                          {showAppScriptInline ? "លាក់បិទ -" : "បង្ហាញកូដ +"}
                        </span>
                      </div>
                      {showAppScriptInline && (
                        <div className="p-4 border-t border-emerald-900/60">
                          <p className="text-[11px] text-emerald-100/70 mb-3 leading-relaxed">
                            <strong>របៀបប្រើចុចតែម្តង (1-Click Run)៖</strong> ចម្លងកូដខាងក្រោមយកទៅ Paste ចូលក្នុង <span className="text-emerald-300 font-bold">Extensions &gt; Apps Script</span> នៃ Google Sheet រួចចុច <strong className="text-white bg-slate-800 px-1 rounded">Run ▶️</strong> នោះវានឹងបង្កើតតារាងនិងធ្វើតេស្តរូបមន្តនេះដោយស្វ័យប្រវត្តិ។
                          </p>
                          <div className="relative group">
                            <pre className="bg-slate-950 text-emerald-400/90 p-4 rounded-lg text-[10px] sm:text-[11px] overflow-x-auto max-h-[250px] font-mono leading-relaxed select-all border border-emerald-900/30">
                              {generateAppsScriptCode(formulaQuests[selectedQuestIdx])}
                            </pre>
                            <button 
                              onClick={() => {
                                navigator.clipboard.writeText(generateAppsScriptCode(formulaQuests[selectedQuestIdx]));
                                showToast("✓ បានចម្លងកូដ Apps Script ជោគជ័យ! សូមយកទៅ Paste ក្នុង Google Sheets។");
                              }}
                              className="absolute top-2 right-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-600 rounded p-1.5 transition opacity-0 group-hover:opacity-100 shadow-lg"
                              title="ចម្លងកូដ (Copy Apps Script Code)"
                            >
                              <ClipboardCopy className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              )}
            </div>
          )}

          {/* TAB CONTENT: 2. EMPLOYEE PAYROLL & CAMBODIAN TAX SIMULATOR */}
          {activeTab === "payroll" && (
            <div className="space-y-6 animate-fade-in" id="payroll-content">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                  <div>
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      <Coins className="w-5 h-5 text-green-600" />
                      ប្រព័ន្ធគណនាប្រាក់ខែ និងពន្ធលើប្រាក់បៀវត្ស (ស្វ័យប្រវត្តិ)
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">
                      បន្ទះពិសោធន៍គណនាពន្ធស្របតាមច្បាប់ហិរញ្ញវត្ថុថ្មីក្នុងប្រទេសកម្ពុជា។ ស្វែងយល់អំពីរូបមន្តគណនាស្វ័យប្រវត្ត។
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <span className="bg-slate-100 text-slate-700 px-3 py-2 rounded text-xs font-mono font-bold flex items-center">
                      អត្រាពន្ធកម្ពុជា (Cambodian Tax Rate Scheme)
                    </span>
                    <button 
                      onClick={() => {
                        setSelectedTutorialId("payroll");
                        setActiveTab("tutorial");
                      }} 
                      className="flex items-center gap-2 px-3 py-2 bg-slate-900 border border-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-sm transition"
                    >
                      <BookOpen className="w-4 h-4" />
                      មេរៀនពីរូបមន្តអត្រាពន្ធ
                    </button>
                  </div>
                </div>

                {/* Payroll interactive form */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">បញ្ចូលបុគ្គលិកថ្មី ដើម្បីគណនាពន្ធស្វ័យប្រវត្តិ៖</h3>
                    <button 
                      onClick={() => {
                        setSelectedTutorialId("tutorial-prompt-form");
                        setActiveTab("tutorial");
                      }} 
                      className="flex items-center gap-1 px-2 py-1 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded text-[11px] font-bold shadow-sm transition"
                    >
                      <BookOpen className="w-3 h-3 text-blue-600" />
                      របៀបសរសេរកូដ Form នេះ
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">ឈ្មោះបុគ្គលិក (Khmer)</label>
                      <input 
                        type="text" 
                        value={newEmployeeName}
                        onChange={(e) => setNewEmployeeName(e.target.value)}
                        placeholder="ឧ. សុខ ចាន់ដារ៉ា" 
                        className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-green-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">ប្រាក់ខែគោល (USD)</label>
                      <input 
                        type="number" 
                        value={newEmployeeSalary}
                        onChange={(e) => setNewEmployeeSalary(e.target.value)}
                        placeholder="ឧ. 600" 
                        className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-green-600 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">ប្រាក់លើកទឹកចិត្ត/ប្រាក់បន្ថែម</label>
                      <input 
                        type="number" 
                        value={newEmployeeBonus}
                        onChange={(e) => setNewEmployeeBonus(e.target.value)}
                        placeholder="ឧ. 50" 
                        className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-green-600 font-mono"
                      />
                    </div>
                    <div className="flex items-end justify-end">
                      <button 
                        onClick={addPayrollEmployee}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-xs py-2 px-4 rounded transition duration-150 flex items-center justify-center gap-1"
                      >
                        <Plus className="w-4 h-4" /> គណនា &amp; បញ្ចូល
                      </button>
                    </div>
                  </div>
                </div>

                {/* Table displaying database payroll records */}
                <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="bg-slate-100 px-4 py-2 flex justify-between items-center text-[11px] border-b border-slate-100 text-slate-400 font-mono">
                    <span>តារាងបើកប្រាក់ខែ - PAYROLL RECONCILIATION</span>
                    <span className="text-green-600 font-bold">Formula active 📂</span>
                  </div>
                  <table className="w-full text-xs text-left border-collapse">
                    <thead className="bg-slate-50 text-slate-705">
                      <tr className="border-b border-slate-200">
                        <th className="p-3 font-semibold">ឈ្មោះបុគ្គលិក</th>
                        <th className="p-3 font-semibold text-right">ប្រាក់ខែគោល (A)</th>
                        <th className="p-3 font-semibold text-right">ប្រទានកម្មបន្ថែម (B)</th>
                        <th className="p-3 font-semibold text-right">ប្រាក់ជាប់ពន្ធសរុប (A+B)</th>
                        <th className="p-3 font-semibold text-center bg-blue-50/50 text-blue-700">អត្រាពន្ធកម្ពុជា (%)</th>
                        <th className="p-3 font-semibold text-right bg-emerald-50 text-emerald-800">ប្រាក់ខែសុទ្ធទទួលបាន</th>
                        <th className="p-3 text-center">លុប</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100">
                      {payrollEmployees.map((emp) => (
                        <tr key={emp.id} className="hover:bg-slate-50 transition">
                          <td className="p-3 font-bold text-slate-800">{emp.name}</td>
                          <td className="p-3 text-right font-mono text-slate-600">${emp.baseSalary.toFixed(2)}</td>
                          <td className="p-3 text-right font-mono text-slate-600">${emp.bonus.toFixed(2)}</td>
                          <td className="p-3 text-right font-mono font-semibold text-slate-900">${(emp.baseSalary+emp.bonus).toFixed(2)}</td>
                          <td className="p-3 text-center font-mono font-bold bg-blue-50/40 text-blue-600">{emp.taxRate}%</td>
                          <td className="p-3 text-right font-mono font-extrabold text-emerald-700 bg-emerald-50/40">${emp.netSalary.toFixed(2)}</td>
                          <td className="p-3 text-center">
                            <button 
                              onClick={() => removePayrollEmployee(emp.id)}
                              className="text-red-500 hover:text-red-700 transition"
                            >
                              <Trash2 className="w-4 h-4 mx-auto" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Educational Tutorial block about Cambodian monthly tax calculation */}
                <div className="bg-blue-50/70 rounded-xl p-4 border border-blue-100 space-y-3">
                  <h4 className="font-bold text-blue-900 text-xs flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-blue-600 shrink-0" />
                    តារាងវាស់ស្ទង់អត្រាពន្ធគណនា (Tax on Salary Scheme In Cambodia)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-slate-600 leading-relaxed">
                        យោងតាមអត្រាពន្ធរបស់អគ្គនាយកដ្ឋានពន្ធដារ និងយន្តការគណនាប្រហាក់ប្រហែល រូបមន្តត្រូវបានរៀបចំឡើងជាភាសារៀល (Riel)។ ប្រសិនបើប្រាក់បៀវត្សរបស់បុគ្គលិកប្រើជាដុល្លារ ត្រូវគុណនឹងអត្រាប្តូរប្រាក់ផ្លូវការ (ឧ. ១ ដុល្លារ = ៤,១០០ រៀល)។
                      </p>
                      <div className="bg-slate-900 text-[11px] font-mono text-slate-200 p-2.5 rounded border border-slate-800 space-y-1">
                        <div><span className="text-green-400"># រូបមន្តគណនាក្នុង Google Sheet ៖</span></div>
                        <div className="text-slate-400 break-all">
                          =IF(E2*4100&lt;=1500000, 0, IF(E2*4100&lt;=2000000, e2*0.05-75000/4100, IF(E2*4100&lt;=8500000, e2*0.1-175000/4100, 15%...)))
                        </div>
                      </div>
                    </div>
                    {/* Cambodia's official thresholds details table */}
                    <div className="bg-white p-2.5 rounded border border-slate-200 text-[11px] space-y-2">
                      <span className="font-bold text-slate-705 block border-b border-slate-100 pb-1">ពន្ធគិតតាមកម្រិតប្រាក់ចំណូល៖</span>
                      {taxBracketsCambodia.map((bracket, bIdx) => (
                        <div key={bIdx} className="flex justify-between items-center text-slate-600">
                          <span>{bracket.limitKh}</span>
                          <span className="font-bold text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded">អត្រា៖ {bracket.rateStr}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Dynamic mini Sandbox to calculate Cambodian salary tax instantly */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 border-dashed space-y-3">
                  <h4 className="font-bold text-slate-800 text-xs">ម៉ាស៊ីនពិសោធន៍ពន្ធប្រចាំខែ (Riel Input Simulator)</h4>
                  <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="w-full md:w-1/2">
                      <label className="block text-[11px] text-slate-500 mb-1">បញ្ចូលប្រាក់បៀវត្សជាប់ពន្ធសរុប (ជារៀល)៖</label>
                      <input 
                        type="number"
                        value={inputRiels}
                        onChange={(e) => setInputRiels(parseInt(e.target.value) || 0)}
                        className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 font-mono text-sm"
                      />
                    </div>
                    <div className="w-full md:w-1/2 bg-white p-3 rounded-lg border border-slate-200 grid grid-cols-2 gap-2 text-center text-xs">
                      <div>
                        <span className="block text-[10px] text-slate-400">អត្រាពន្ធត្រូវជាប់</span>
                        <span className="font-extrabold text-blue-600 text-md">{calculatedTaxRate}%</span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-slate-400">ប្រាក់ពន្ធត្រូវបង់</span>
                        <span className="font-extrabold text-emerald-600 text-md">{calculatedTaxAmount.toLocaleString()} រៀល</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB CONTENT: 3. EMPLOYEE INFORMATION SYSTEM DATABASE */}
          {activeTab === "employee" && (
            <div className="space-y-6 animate-fade-in" id="employee-content">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      <Users className="w-5 h-5 text-green-600" />
                      ប្រព័ន្ធគ្រប់គ្រងព័ត៌មានបុគ្គលិក និងទិន្នន័យ (Database Center)
                    </h2>
                    <p className="text-xs text-slate-500">
                      ស្វ័យប្រវត្តបញ្ជីបុគ្គលិកដោយរៀបចំ Data Dropdown សាកល្បងបញ្ចូលទិន្នន័យបុគ្គលិក និងត្រងព័ត៌មាន (Department Filters) តាមផ្នែកការងារ។
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedTutorialId("employee");
                      setActiveTab("tutorial");
                    }} 
                    className="flex shrink-0 items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-sm transition"
                  >
                    <BookOpen className="w-4 h-4" />
                    វិធីសាស្ត្ររៀបចំប្រព័ន្ធនេះ
                  </button>
                </div>

                {/* Input Mode Selector Tabs */}
                <div className="flex gap-2 border-b border-slate-200 pb-1">
                  <button
                    onClick={() => setEmployeeInputMode("manual")}
                    className={`px-4 py-2 text-xs font-bold transition flex items-center gap-1.5 border-b-2 ${
                      employeeInputMode === "manual"
                        ? "border-green-600 text-green-700 font-extrabold"
                        : "border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    បញ្ចូលបុគ្គលិកម្នាក់ៗ (Manual Single Add)
                  </button>
                  <button
                    onClick={() => setEmployeeInputMode("csv")}
                    className={`px-4 py-2 text-xs font-bold transition flex items-center gap-1.5 border-b-2 ${
                      employeeInputMode === "csv"
                        ? "border-green-600 text-green-700 font-extrabold"
                        : "border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    នាំចូលបុគ្គលិកជាកញ្ចប់ (CSV Bulk Import)
                  </button>

                  <button
                    onClick={() => setShowCsvGuidelinesModal(true)}
                    className="ml-auto px-3 py-1.5 text-[11px] font-bold bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-lg transition-colors flex items-center gap-1"
                  >
                    <Info className="w-3.5 h-3.5" />
                    របៀបរៀបចំ CSV (CSV Guidelines)
                  </button>
                </div>

                {/* Submitting Staff to simulated DB section */}
                {employeeInputMode === "manual" && (
                  <div className="space-y-3">
                    {/* Real-time Validation Helper Summary Banner */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl gap-2 text-xs">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-slate-700">🔍 ស្ថានភាពសុពលភាព៖</span>
                        {/* ID validation badge */}
                        {newStaff.id.trim() === "" ? (
                          <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> ID ទទេ (ID is required)
                          </span>
                        ) : employeeDb.some(emp => emp.id.trim().toUpperCase() === newStaff.id.trim().toUpperCase()) ? (
                          <span className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 animate-pulse">
                            <AlertTriangle className="w-3 h-3" /> ID ស្ទួនគ្នា (Duplicate ID)
                          </span>
                        ) : (
                          <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> ID ត្រឹមត្រូវ (ID Valid)
                          </span>
                        )}

                        {/* Email validation badge */}
                        {newStaff.email.trim() === "" ? (
                          <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> អ៊ីមែលជំហរទទេ
                          </span>
                        ) : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newStaff.email) ? (
                          <span className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 animate-pulse">
                            <AlertTriangle className="w-3 h-3" /> ទម្រង់អ៊ីមែលខុស (Invalid Email)
                          </span>
                        ) : (
                          <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> អ៊ីមែលត្រឹមត្រូវ (Email Valid)
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedTutorialId("tutorial-prompt-form");
                            setActiveTab("tutorial");
                          }}
                          className="text-[11px] bg-white hover:bg-slate-100 text-blue-600 px-2 py-1 rounded border border-slate-300 transition font-bold flex items-center gap-1 shrink-0"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          របៀបសរសេរកូដ Form នេះ
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowValidationHelpModal(true)}
                          className="text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded border border-indigo-200 transition font-bold flex items-center gap-1 shrink-0"
                        >
                          <Info className="w-3.5 h-3.5 text-indigo-600" />
                          ការណែនាំពីការបញ្ចូល (Data Handbook)
                        </button>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-1 md:grid-cols-6 gap-3">
                      {/* ID Field */}
                      <div className="relative">
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-[11px] text-slate-500">អត្តសញ្ញាណ ID</label>
                          <button
                            type="button"
                            onClick={() => {
                              let nextNum = employeeDb.length + 1;
                              let nextId = `EMP00${nextNum}`;
                              while (employeeDb.some(emp => emp.id.trim().toUpperCase() === nextId.toUpperCase())) {
                                nextNum++;
                                nextId = `EMP00${nextNum}`;
                              }
                              setNewStaff({ ...newStaff, id: nextId });
                              showToast(`✓ បានស្វែងរក ID ទំនេរ៖ ${nextId}`);
                            }}
                            title="បង្កើត ID ស្វ័យប្រវត្ត"
                            className="text-[10px] text-green-600 hover:text-green-800 font-bold"
                          >
                            🔄 ស្វ័យប្រវត្ត
                          </button>
                        </div>
                        <div className="relative">
                          <input 
                            type="text" 
                            value={newStaff.id}
                            onChange={(e) => setNewStaff({...newStaff, id: e.target.value})}
                            placeholder="ឧ. EMP005"
                            className={`w-full bg-white border rounded px-2.5 py-1.5 text-xs font-mono font-bold focus:outline-none ${
                              newStaff.id.trim() === ""
                                ? "border-amber-300 focus:border-amber-500"
                                : employeeDb.some(emp => emp.id.trim().toUpperCase() === newStaff.id.trim().toUpperCase())
                                  ? "border-red-400 text-red-600 focus:border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.3)]"
                                  : "border-slate-300 focus:border-green-600 focus:text-green-700"
                            }`}
                          />
                          {/* Real-time Tooltip Warning for Duplicate ID */}
                          {newStaff.id.trim() !== "" && employeeDb.some(emp => emp.id.trim().toUpperCase() === newStaff.id.trim().toUpperCase()) && (
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 cursor-help group z-10">
                              <AlertCircle className="w-4 h-4 text-red-500" />
                              <div className="hidden group-hover:block absolute right-0 bottom-full mb-2 bg-slate-900 text-white text-[10px] p-2 rounded shadow-xl whitespace-nowrap z-20">
                                ⚠️ ID នេះមានរួចហើយក្នុងប្រព័ន្ធ! (Duplicate ID)
                              </div>
                            </div>
                          )}
                        </div>
                        {newStaff.id.trim() !== "" && employeeDb.some(emp => emp.id.trim().toUpperCase() === newStaff.id.trim().toUpperCase()) && (
                          <p className="text-[9px] text-red-500 mt-1 font-bold">⚠️ ID ស្ទួនគ្ម្នា (Duplicate)</p>
                        )}
                        {newStaff.id.trim() === "" && (
                          <p className="text-[9px] text-amber-600 mt-1">⚠️ សូមបញ្ជូល ID</p>
                        )}
                      </div>

                      {/* Name Field */}
                      <div>
                        <label className="block text-[11px] text-slate-500 mb-1">ឈ្មោះបុគ្គលិក</label>
                        <input 
                          type="text" 
                          value={newStaff.name}
                          onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                          placeholder="ឧ. សុខ ជា"
                          className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-green-600"
                        />
                      </div>

                      {/* Gender Field */}
                      <div>
                        <label className="block text-[11px] text-slate-500 mb-1">ភេទ</label>
                        <select 
                          value={newStaff.gender}
                          onChange={(e) => setNewStaff({...newStaff, gender: e.target.value})}
                          className="w-full bg-white border border-slate-300 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-green-600"
                        >
                          <option value="ប្រុស">ប្រុស (Male)</option>
                          <option value="ស្រី">ស្រី (Female)</option>
                        </select>
                      </div>

                      {/* Role Dropdown */}
                      <div>
                        <label className="block text-[11px] text-slate-500 mb-1">ផ្នែកការងារ (Role)</label>
                        <select 
                          value={newStaff.role}
                          onChange={(e) => setNewStaff({...newStaff, role: e.target.value})}
                          className="w-full bg-white border border-slate-300 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-green-600"
                        >
                          <option value="រដ្ឋបាល">រដ្ឋបាល (Admin)</option>
                          <option value="គណនេយ្យ">គណនេយ្យ (Finance)</option>
                          <option value="លក់">លក់ (Sales)</option>
                        </select>
                      </div>

                      {/* Email Field */}
                      <div>
                        <label className="block text-[11px] text-slate-500 mb-1">អសយដ្ឋានអ៊ីមែល (Email)</label>
                        <input 
                          type="email" 
                          value={newStaff.email}
                          onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
                          placeholder="ឧ. user@domain.com"
                          className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-green-600"
                        />
                      </div>

                      {/* Save Button */}
                      <div className="flex items-end">
                        <button
                          onClick={handleAddStaff}
                          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-xs py-2 px-4 rounded transition flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-4 h-4" /> រក្សាទុកបុគ្គលិក
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Filterable database grid search tool */}
                <div className="flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center bg-slate-100 p-3 rounded-lg border border-slate-200">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-slate-700">បង្ហាញផ្នែក៖</span>
                    <div className="flex gap-1.5">
                      {["ទាំងអស់", "រដ្ឋបាល", "គណនេយ្យ", "លក់"].map((rl) => (
                        <button
                          key={rl}
                          onClick={() => setRoleFilter(rl)}
                          className={`px-3 py-1 text-xs rounded font-bold cursor-pointer transition ${
                            roleFilter === rl 
                              ? "bg-slate-900 text-white shadow-sm" 
                              : "bg-white hover:bg-slate-50 text-slate-600 border border-slate-200"
                          }`}
                        >
                          {rl}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Search query input */}
                  <div className="flex gap-2">
                    <div className="relative">
                      <input 
                        type="text"
                        value={employeeSearchQuery}
                        onChange={(e) => setEmployeeSearchQuery(e.target.value)}
                        placeholder="ស្វែងរក ID ឬឈ្មោះ..."
                        className="bg-white border border-slate-300 rounded px-3 py-1.5 pl-8 text-xs text-slate-800 focus:outline-none w-full md:w-48"
                      />
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    </div>
                    <button
                      onClick={() => exportHTMLToPDF('employee-export-table', 'Employee_List.pdf')}
                      className="bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 flex items-center gap-1.5 px-3 py-1.5 rounded transition text-xs font-bold shrink-0 cursor-pointer"
                      title="ទាញយកជា PDF"
                    >
                      <Download className="w-3.5 h-3.5" />
                      PDF
                    </button>
                  </div>
                </div>

                {/* Corporate Employee Database Table list */}
                <div id="employee-export-table" className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                  <div className="pdf-export-title hidden font-bold text-slate-800 text-lg p-3 text-center bg-white" style={{ display: 'none' }}>បញ្ជីឈ្មោះបុគ្គលិក (Employee List)</div>
                  <table className="w-full text-xs text-left border-collapse">
                    <thead className="bg-slate-50 text-slate-800">
                      <tr>
                        <th className="p-3 font-semibold text-center border-r border-slate-200">អត្តសញ្ញាណ ID</th>
                        <th className="p-3 font-semibold">ឈ្មោះបុគ្គលិក</th>
                        <th className="p-3 font-semibold text-center">ភេទ</th>
                        <th className="p-3 font-semibold">ផ្នែកការងារ</th>
                        <th className="p-3 font-semibold">អសយដ្ឋានអ៊ីមែល</th>
                        <th className="p-3 font-semibold text-center">ស្ថានភាព</th>
                        <th className="p-3 text-center" data-html2canvas-ignore="true">ជម្រើស</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100">
                      {filteredEmployees.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="p-8 text-center text-slate-400">
                            <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                            រកមិនឃើញទិន្នន័យបុគ្គលិកដែលចង់ស្វែងរកឡើយ។
                          </td>
                        </tr>
                      ) : (
                        filteredEmployees.map((st) => (
                          <tr key={st.id} className="hover:bg-slate-50 transition">
                            <td className="p-3 border-r border-slate-100 font-mono font-bold text-center text-slate-500">{st.id}</td>
                            <td className="p-3 font-bold text-slate-900">{st.name}</td>
                            <td className="p-3 text-center">{st.gender}</td>
                            <td className="p-3">
                              <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-semibold text-[11px]">
                                {st.role}
                              </span>
                            </td>
                            <td className="p-3 font-mono text-slate-600 text-xs">{st.email}</td>
                            <td className="p-3 text-center">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                st.status === "សកម្ម" ? "bg-emerald-100 text-emerald-800" : "bg-orange-100 text-orange-850"
                              }`}>
                                {st.status}
                              </span>
                            </td>
                            <td className="p-3 text-center" data-html2canvas-ignore="true">
                              <button 
                                onClick={() => handleDeleteStaff(st.id, st.name)}
                                className="text-red-500 hover:text-red-700 transition cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4 mx-auto" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* High quality expert instruction panel */}
                <div className="bg-slate-800 text-white p-5 rounded-2xl flex items-start gap-4 shadow-sm">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shrink-0 mt-1">
                    <Info className="w-5 h-5 text-white" />
                  </div>
                  <div className="space-y-1 text-slate-300">
                    <span className="text-xs font-bold text-green-400 block uppercase tracking-wider">របៀបរៀបចំ DROP-DOWN ស្វ័យប្រវត្តក្នុង Google Sheets</span>
                    <p className="text-xs leading-relaxed">
                      នៅក្នុងការងាររដ្ឋបាលពិតប្រាកដ ប្អូនៗត្រូវរារាំងការបញ្ចូលឈ្មោះខុសផ្នែក ឬខុសមុខតំណែង។ របៀបធ្វើគឺ ជ្រើសរើសជួរដែលចង់ដាក់ រួចចូលទៅកាន់ <span className="font-bold text-white bg-slate-700 px-1.5 py-0.5 rounded">Data</span> ➡ <span className="font-bold text-white bg-slate-700 px-1.5 py-0.5 rounded">Data Validation</span> ➡ បន្ថែម Rule ជ្រើសរើស <span className="font-bold text-white bg-slate-700 px-1.5 py-0.5 rounded">Dropdown</span> រួចសរសេរឈ្មោះជម្រើស (ឧទហរណ៍៖ រដ្ឋបាល, គណនេយ្យ, បណ្ដុះបណ្ដាល)។
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )}


          {/* TAB CONTENT: 4. AUTOMATED INCOME EXPENSE CONTROLLER */}
          {activeTab === "finance" && (
            <div className="space-y-6 animate-fade-in" id="finance-content">
              
              {/* Top Stats of Profit calculation */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-400 font-bold uppercase tracking-wider">ចំណូលសរុប (Income)</span>
                    <span className="text-xl font-black font-mono text-emerald-600">${totalIncome.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500">
                    <ArrowDownRight className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-400 font-bold uppercase tracking-wider">ចំណាយសរុប (Expense)</span>
                    <span className="text-xl font-black font-mono text-red-500">${totalExpense.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-400 font-bold uppercase tracking-wider">សមតុល្យចំណេញ (Balance)</span>
                    <span className={`text-xl font-black font-mono ${totalBalance >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      ${totalBalance.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Transactions simulation workspace layout */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      ប្រព័ន្ធកត់ត្រាចំណូលចំណាយស្វ័យប្រវត្ត &amp; Recharts Visualizer
                    </h2>
                    <p className="text-xs text-slate-500">
                      រៀនបង្កើតរបាយការណ៍ហិរញ្ញវត្ថុប្រចាំការិយាល័យ។ បញ្ចូលការចំណាយ និងវិភាគក្រាហ្វិកស្វ័យប្រវត្តិ។
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedTutorialId("finance");
                      setActiveTab("tutorial");
                    }} 
                    className="flex shrink-0 items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-sm transition"
                  >
                    <BookOpen className="w-4 h-4" />
                    វិធីសាស្ត្ររៀបចំប្រព័ន្ធនេះ
                  </button>
                </div>

                {/* Entry fields for ledger transact */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">បញ្ជូលទិន្នន័យ (Data Entry form)</h3>
                    <button 
                      onClick={() => {
                        setSelectedTutorialId("tutorial-prompt-form");
                        setActiveTab("tutorial");
                      }} 
                      className="flex items-center gap-1 px-2 py-1 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded text-[11px] font-bold shadow-sm transition"
                    >
                      <BookOpen className="w-3 h-3 text-blue-600" />
                      របៀបសរសេរកូដ Form នេះ
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">ឈ្មោះប្រតិបត្តិការ (Description)</label>
                    <input 
                      type="text"
                      value={newTx.desc}
                      onChange={(e) => setNewTx({...newTx, desc: e.target.value})}
                      placeholder="ឧ. ទិញថ្នាំលាបពណ៌ជញ្ជាំង"
                      className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">ប្រភេទប្រតិបត្តិការ</label>
                    <select
                      value={newTx.type}
                      onChange={(e) => setNewTx({...newTx, type: e.target.value})}
                      className="w-full bg-white border border-slate-300 rounded px-2 py-1.5 text-xs text-slate-800 focus:outline-none"
                    >
                      <option value="income">🟢 ចំណូល (Income)</option>
                      <option value="expense">🔴 ចំណាយ (Expense)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">ទឹកប្រាក់ (USD)</label>
                    <input 
                      type="number"
                      value={newTx.amount}
                      onChange={(e) => setNewTx({...newTx, amount: e.target.value})}
                      placeholder="ឧ. 150"
                      className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none font-mono"
                    />
                  </div>
                  <div className="flex items-end">
                    <button 
                      onClick={handleAddTx}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2 px-4 rounded transition duration-150 flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" /> រក្សាទុកកត់ត្រា
                    </button>
                  </div>
                </div>
                </div>

                {/* Graph representation with clean styling */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-3">របាយការណ៍ហិរញ្ញវត្ថុការិយាល័យ</span>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} />
                        <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                        <Tooltip content={<CustomTooltip />} cursor={{fill: '#F1F5F9'}} />
                        <Legend />
                        <Bar dataKey="ទឹកប្រាក់" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Listing historic financial inputs */}
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-slate-700 text-sm">បញ្ជីប្រតិបត្តិការ (Transactions)</h3>
                  <button
                    onClick={() => exportHTMLToPDF('finance-export-table', 'Income_Expense_Report.pdf')}
                    className="bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 flex items-center gap-1.5 px-3 py-1.5 rounded transition text-xs font-bold cursor-pointer"
                    title="ទាញយកជា PDF"
                  >
                    <Download className="w-3.5 h-3.5" />
                    PDF Report
                  </button>
                </div>
                <div id="finance-export-table" className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                  <div className="pdf-export-title hidden font-bold text-slate-800 text-lg p-3 text-center bg-white" style={{ display: 'none' }}>របាយការណ៍ហិរញ្ញវត្ថុ (Income & Expense)</div>
                  <table className="w-full text-xs text-left border-collapse animate-fade-in">
                    <thead className="bg-[#f8f9fa] border-b border-[#c0c0c0]">
                      <tr>
                        <th className="w-8 border-r border-[#c0c0c0] bg-[#f8f9fa] text-center text-[#666666] font-normal text-[10px]"></th>
                        <th className="p-2 font-normal text-[#666666] text-center border-r border-[#c0c0c0]">A<br/><span className="font-semibold text-slate-800">កាលបរិច្ឆេទ</span></th>
                        <th className="p-2 font-normal text-[#666666] text-center border-r border-[#c0c0c0]">B<br/><span className="font-semibold text-slate-800">ព័ត៌មានប្រតិបត្តិការ</span></th>
                        <th className="p-2 font-normal text-[#666666] text-center border-r border-[#c0c0c0]">C<br/><span className="font-semibold text-slate-800">ប្រភេទ</span></th>
                        <th className="p-2 font-normal text-[#666666] text-center border-r border-[#c0c0c0]">D<br/><span className="font-semibold text-slate-800">ទឹកប្រាក់ (USD)</span></th>
                        <th className="p-2 font-normal text-[#666666] text-center" data-html2canvas-ignore="true"><br/><span className="font-semibold text-slate-800">Action</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.length === 0 ? (
                        <tr>
                          <td className="border-r border-[#e2e3e3] bg-[#f8f9fa] text-center text-[#666666] font-normal text-[10px] py-2">1</td>
                          <td colSpan={5} className="p-8 text-center text-slate-400">
                            <TrendingUp className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                            មិនមានប្រតិបត្តិការត្រូវបង្ហាញឡើយ។
                          </td>
                        </tr>
                      ) : (
                        transactions.map((tx, idx) => (
                          <tr key={idx} className="border-b border-[#e2e3e3] hover:bg-blue-50/30">
                            <td className="border-r border-[#c0c0c0] bg-[#f8f9fa] text-center text-[#666666] font-normal text-[10px] py-2">{idx + 2}</td>
                            <td className="p-2 font-mono text-slate-600 border-r border-[#e2e3e3]">{tx.date}</td>
                            <td className="p-2 text-slate-800 border-r border-[#e2e3e3]">{tx.desc}</td>
                            <td className="p-2 border-r border-[#e2e3e3]">
                              <span className={`inline-block px-2.5 py-1 rounded text-[10px] font-bold ${
                                tx.type === "income" ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                              }`}>
                                {tx.type === "income" ? "ចំណូល" : "ចំណាយ"}
                              </span>
                            </td>
                            <td className="p-2 text-right font-mono font-semibold border-r border-[#e2e3e3]">
                              {tx.type === "income" ? "" : "-"}{tx.amount.toFixed(2)}
                            </td>
                            <td className="p-2 text-center" data-html2canvas-ignore="true">
                              <button 
                                onClick={() => handleDeleteTx(idx)}
                                className="text-red-500 hover:text-red-700 transition cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4 mx-auto" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* High quality expert instruction panel */}
                <div className="bg-slate-800 text-white p-5 rounded-2xl flex items-start gap-4 shadow-sm">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shrink-0 mt-1">
                    <Info className="w-5 h-5 text-white" />
                  </div>
                  <div className="space-y-1 text-slate-300">
                    <span className="text-xs font-bold text-green-400 block uppercase tracking-wider">ការប្រើ SUMIFS នៅក្នុងសន្លឹកកិច្ចការ</span>
                    <p className="text-xs leading-relaxed">
                      នៅពេលអ្នកចង់បូកលុយ "ចំណូល" ឬ "ចំណាយ" ដោយស្វ័យប្រវត្តិ ក្នុង Google Sheets អ្នកគួរប្រើរូបមន្ត <span className="font-bold text-white bg-slate-700 px-1.5 py-0.5 rounded border border-slate-600">=SUMIFS()</span>។ ឧទាហរណ៍៖ បើចង់បូកតែចំណាយ គឺសរសេរ: <span className="font-bold text-white font-mono bg-slate-700 px-1.5 py-0.5 rounded border border-slate-600">=SUMIFS(D:D, C:C, "ចំណាយ")</span> (ដោយ D ជាជួរទឹកប្រាក់ C ជាជួរប្រភេទ)។
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )}

          {activeTab === "telegram" && (
            <div className="space-y-6 animate-fade-in" id="telegram-content">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-blue-600" />
                      ប្រព័ន្ធភ្ជាប់ទំនាក់ទំនង Google Sheets ទៅកាន់ Telegram Bot
                    </h2>
                    <p className="text-xs text-slate-500">
                      រៀបចំ Google Sheets ឱ្យបញ្ជូនសារស្វ័យប្រវត្តទៅ Telegram Group/Channel ដកស្រង់កូដ Apps Script គំរូខាងក្រោម។
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedTutorialId("telegram");
                      setActiveTab("tutorial");
                    }} 
                    className="flex shrink-0 items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-sm transition"
                  >
                    <BookOpen className="w-4 h-4" />
                    វិធីសាស្ត្ររៀបចំប្រព័ន្ធនេះ
                  </button>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">១. កំណត់រចនាសម្ព័ន្ធបណ្ដាញ Telegram Bot</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Telegram Bot Token (HTTP API Key)</label>
                      <input 
                        type="text"
                        value={telegramConfig.botToken}
                        onChange={(e) => setTelegramConfig({...telegramConfig, botToken: e.target.value})}
                        placeholder="ឧ. 123456789:ABCdefGhI..."
                        className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Telegram Chat ID (ឆានែល ឬក្រុម)</label>
                      <input 
                        type="text"
                        value={telegramConfig.chatId}
                        onChange={(e) => setTelegramConfig({...telegramConfig, chatId: e.target.value})}
                        placeholder="-10023456789"
                        className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div className="pt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">ហេតុការណ៍ដែលត្រូវផ្ញើសារ (Trigger Event)</label>
                      <select
                        value={telegramConfig.triggerType}
                        onChange={(e) => setTelegramConfig({...telegramConfig, triggerType: e.target.value})}
                        className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none"
                      >
                        <option value="រាល់ពេលបន្ថែមជួរបុគ្គលិកថ្មី (On Row Added)">បន្ថែមជួរបុគ្គលិកថ្មី (On Row Added)</option>
                        <option value="រាល់ពេលមានការផ្លាស់ប្តូរទិន្នន័យ (On Edit)">រាល់ពេលមានការកែប្រែទិន្នន័យ (On Edit)</option>
                        <option value="រាល់ពេលមានគេបញ្ជូន Form ចូល (On Form Submit)">រាល់ពេលមានគេបញ្ជូន Form ចូល (On Form Submit)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">ក្បាលកូឡោនដែលចង់ផ្ញើ (ក្បៀស)</label>
                      <input 
                        type="text"
                        value={telegramConfig.columnsToNotify.join(", ")}
                        onChange={(e) => setTelegramConfig({...telegramConfig, columnsToNotify: e.target.value.split(",").map(s => s.trim())})}
                        placeholder="ឧ. ឈ្មោះ, ប្រាក់ខែ, បញ្ជាក់"
                        className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="block text-[11px] text-slate-500 mb-1">ខ្លឹមសារសារស្វាគមន៍ / កំណត់ត្រាបន្ថែមក្នុងសារ</label>
                    <textarea
                      value={telegramConfig.customMessage}
                      onChange={(e) => setTelegramConfig({...telegramConfig, customMessage: e.target.value})}
                      rows={2}
                      className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-wrap justify-between gap-2 pt-2">
                    <button 
                      onClick={() => generatePredefinedScript()}
                      className="bg-slate-200 text-slate-700 hover:bg-slate-300 font-bold text-xs py-2 px-4 rounded shadow-sm transition cursor-pointer"
                    >
                      🔄 ធ្វើឱ្យកូដទម្រង់ដើមស្រស់ឡើងវិញ
                    </button>
                  </div>
                </div>

                {/* Code block output */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center bg-slate-900 px-4 py-2 rounded-t-xl border-b border-slate-800">
                    <span className="text-[11.5px] font-mono text-slate-300">Google Apps Script ស្វ័យប្រវត្តិ (copy code)</span>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(generatedScript);
                        showToast("✓ ចម្លងកូដ Apps Script ជោគជ័យ! អ្នកអាចយកទៅ Paste ក្នុង Extensions -> Apps Script ក្នុង Google Sheets");
                      }}
                      className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-[10px] px-3 py-1 rounded border border-slate-700 transition cursor-pointer"
                    >
                      Copy Code 📄
                    </button>
                  </div>
                  <pre className="bg-slate-950 text-slate-200 p-4 rounded-b-xl text-[11.5px] font-mono overflow-x-auto border-l-4 border-blue-500 h-80 max-h-96 leading-relaxed">
                    {generatedScript}
                  </pre>
                </div>

                {/* Instant Telegram Bot Notification simulator */}
                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-3">
                  <span className="text-xs font-bold text-slate-700 block">២. កន្លែងតេស្តសាកល្បង Telegram Live Event Listener</span>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={testMessage}
                      onChange={(e) => setTestMessage(e.target.value)}
                      placeholder="សរសេរសារតេស្តសាកល្បងផ្ញើចេញ..." 
                      className="flex-1 bg-white border border-slate-200 rounded px-3 py-1.5 text-xs text-slate-800 focus:outline-none"
                    />
                    <button 
                      onClick={handleTriggerTestTelegram}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold text-xs px-4 py-1.5 rounded cursor-pointer duration-150 shrink-0"
                    >
                      តេស្តផ្ញើសារ ✈️
                    </button>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">ប្រវត្តិសារ ឬសកម្មភាព (Mock Activity Logs)</span>
                    <div className="bg-slate-900 rounded-lg p-3 space-y-2 h-28 overflow-y-auto">
                      {telegramLogs.map((log, lIdx) => (
                        <div key={lIdx} className="text-xs border-b border-slate-800 pb-1.5 flex justify-between gap-2 text-slate-300 font-mono">
                          <span>{log.msg}</span>
                          <span className="text-slate-500 shrink-0">{log.time}</span>
                        </div>
                      ))}
                      {telegramLogs.length === 0 && (
                        <div className="text-xs text-slate-500 text-center py-4">មិនទាន់មានសកម្មភាពផ្ញើសារនៅឡើយទេ</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

          {/* Special "Did you know?" tip box from Professional Polish aesthetic instructions */}
          <div className="bg-slate-800 text-white p-6 rounded-2xl flex flex-col justify-between shadow-lg space-y-4 relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-3 -translate-y-3 w-16 h-16 bg-slate-700/50 rounded-full"></div>
            
            <div className="space-y-2 relative z-10">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-green-400" />
              </div>
              <h4 className="font-extrabold text-[15px] text-white">តើអ្នកដឹងទេ? 💡</h4>
              <p className="text-[12px] text-slate-300 leading-relaxed">
                ការប្រើប្រាស់ Google Apps Script អាចជួយលុបបំបាត់ពេលវេលាគណនាដៃ និងបំពេញព័ត៌មានបុគ្គលិកដដែលៗរហូតដល់ទៅ ៨០% សម្រាប់ការិយាល័យរដ្ឋបាលនៅកម្ពុជា។ វាអាចភ្ជាប់ទៅកាន់ Telegram, Gmail និង Google Drive របស់លោកអ្នកស្វ័យប្រវត្តិ។
              </p>
            </div>
          </div>

          {/* Telegram Live Sandbox Quick summary logs (Persistent on side sidebar too) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                🔔 ការជូនដំណឹង Telegram (Live)
              </h3>
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping"></span>
            </div>
            
            <div className="space-y-2">
              <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100 relative">
                <div className="text-[9px] font-bold text-blue-600 uppercase mb-1">Telegram System Bot</div>
                <p className="text-[11.5px] text-slate-700 leading-normal">
                  🔔 ប្រព័ន្ធគណនាប្រាក់ខែបុគ្គលិក បានផ្ទៀងផ្ទាត់ និងគណនាដកពន្ធត្រឹមត្រូវរួចរាល់សម្រាប់ខែនេះ!
                </p>
                <span className="block text-[8.5px] text-right text-slate-400 mt-1">10:00 AM</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-150 relative opacity-70">
                <div className="text-[9px] font-bold text-slate-600 uppercase mb-1">Telegram System Bot</div>
                <p className="text-[11.5px] text-slate-700 leading-normal">
                  ✅ របាយការណ៍សង្ខេប៖ ចំណូលសរុប $3,500.00 ចំណាយ $550.00 ប្រាក់ចំណេញសល់ $2,950.00 ត្រូវបានបូកចូលដោយ SUMIFS។
                </p>
                <span className="block text-[8.5px] text-right text-slate-400 mt-1">ម្សិលមិញ</span>
              </div>
            </div>
          </div>
        </div>
      )}

          {/* TAB CONTENT: ADMIN PORTAL */}
          {activeTab === "admin" && isAdmin && (
            <div className="space-y-6 animate-fade-in" id="admin-content">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center">
                    <UserCog className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">ផ្ទាំងគ្រប់គ្រង (Admin Dashboard)</h2>
                    <p className="text-sm text-slate-500">សិទ្ធិពិសេសសម្រាប់តាមដានទិន្នន័យអ្នកប្រើប្រាស់ និង ប្រព័ន្ធ</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 bg-blue-500/5 rounded-full -mr-8 -mt-8"></div>
                    <Users className="w-6 h-6 text-blue-600" />
                    <p className="text-sm font-semibold text-slate-600">អ្នកប្រើប្រាស់សរុប (Total Users)</p>
                    <p className="text-2xl font-bold text-slate-800">{totalUsers} នាក់</p>
                  </div>
                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 bg-green-500/5 rounded-full -mr-8 -mt-8"></div>
                    <Shield className="w-6 h-6 text-green-600" />
                    <p className="text-sm font-semibold text-slate-600">កូដមាសសរុប (Total Codes)</p>
                    <p className="text-2xl font-bold text-slate-800">{goldenCodes.length} កូដ</p>
                  </div>
                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 bg-purple-500/5 rounded-full -mr-8 -mt-8"></div>
                    <Activity className="w-6 h-6 text-purple-600" />
                    <p className="text-sm font-semibold text-slate-600">អ្នកសកម្ម (Active Students)</p>
                    <p className="text-2xl font-bold text-slate-800">{activeStudents.length} នាក់</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                     <h3 className="text-lg font-bold text-slate-800">សិស្សដែលសកម្មថ្មីៗ (Recent Active Students)</h3>
                     <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                       <table className="w-full text-left text-sm text-slate-600">
                         <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                           <tr>
                             <th className="p-3">ឈ្មោះ និង អ៉ីមែល</th>
                             <th className="p-3">ស្ថានភាព</th>
                           </tr>
                         </thead>
                         <tbody className="divide-y divide-slate-100">
                           {activeStudents.map((student) => (
                             <tr key={student.id} className="hover:bg-slate-50">
                               <td className="p-3">
                                  <div className="font-semibold text-slate-800">{student.name || "មិនស្គាល់"}</div>
                                  <div className="text-xs">{student.email}</div>
                               </td>
                               <td className="p-3">
                                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs whitespace-nowrap">
                                    {student.last_login ? new Date(student.last_login).toLocaleDateString() : 'សកម្ម'}
                                  </span>
                               </td>
                             </tr>
                           ))}
                           {activeStudents.length === 0 && (
                             <tr>
                               <td colSpan={2} className="p-4 text-center text-slate-400 text-sm">មិនទាន់មានទិន្នន័យទេ</td>
                             </tr>
                           )}
                         </tbody>
                       </table>
                     </div>
                  </div>

                  <div className="space-y-4">
                     <div className="flex items-center justify-between">
                       <h3 className="text-lg font-bold text-slate-800">លេខកូដសម្ងាត់មាស (Golden Codes)</h3>
                       <button onClick={generateNewGoldenCode} className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-1">
                         <Plus className="w-4 h-4" />
                         បង្កើតកូដថ្មី
                       </button>
                     </div>
                     <div className="border border-slate-200 rounded-xl overflow-hidden bg-white max-h-64 overflow-y-auto">
                       <table className="w-full text-left text-sm text-slate-600">
                         <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 sticky top-0">
                           <tr>
                             <th className="p-3">កូដ</th>
                             <th className="p-3">ស្ថានភាព</th>
                             <th className="p-3">សកម្មភាព</th>
                           </tr>
                         </thead>
                         <tbody className="divide-y divide-slate-100">
                           {goldenCodes.map((gc) => (
                             <tr key={gc.code} className="hover:bg-slate-50">
                               <td className="p-3">
                                 <div className="font-mono font-bold text-amber-600">{gc.code}</div>
                                 <div className="text-[10px] text-slate-400">បង្កើត: {gc.created_at ? new Date(gc.created_at).toLocaleDateString() : ''}</div>
                               </td>
                               <td className="p-3">
                                 {gc.status === 'active' ? (
                                   <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-[10px] font-bold">ទំនេរ / មិនទាន់ប្រើ</span>
                                 ) : (
                                   <div className="flex flex-col">
                                     <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold w-fit mb-1">បានប្រើរួច</span>
                                     <span className="text-[10px] text-slate-500 line-clamp-1">{gc.used_by}</span>
                                   </div>
                                 )}
                               </td>
                               <td className="p-3">
                                 {gc.status === 'active' && (
                                   <div className="flex items-center gap-1.5">
                                     <button
                                       onClick={() => {
                                         navigator.clipboard.writeText(buildGoldenCodeMessage(gc.code));
                                         alert("បានចម្លងសារ (កូដ + តំណ) ដោយជោគជ័យ!");
                                       }}
                                       className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-white px-2 py-1.5 rounded text-xs font-semibold shadow-sm transition active:scale-95"
                                       title="ចម្លងសារ (កូដ + តំណ)"
                                     >
                                       <Copy className="w-3.5 h-3.5" />
                                       ចម្លង
                                     </button>
                                     <button
                                       onClick={() => sendCodeViaBot(gc.code)}
                                       className="flex items-center gap-1 bg-[#229ED9] hover:bg-[#1E8CC0] text-white px-2 py-1.5 rounded text-xs font-semibold shadow-sm transition active:scale-95"
                                       title="ផ្ញើទៅ Telegram admin (tap-to-copy) → admin forward បន្តទៅសិស្ស"
                                     >
                                       <Send className="w-3.5 h-3.5" />
                                       ផ្ញើ Bot
                                     </button>
                                   </div>
                                 )}
                               </td>
                             </tr>
                           ))}
                           {goldenCodes.length === 0 && (
                             <tr>
                               <td colSpan={3} className="p-4 text-center text-slate-400 text-sm">មិនទាន់មានលេខកូដនៅឡើយទេ</td>
                             </tr>
                           )}
                         </tbody>
                       </table>
                     </div>
                  </div>
                </div>

                <div className="space-y-4 border-t border-slate-100 pt-6">
                   <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                     <Code className="w-5 h-5 text-amber-600" />
                     បង្កើត Google Sheets សម្រាប់លំហាត់ទាំង ៥៥ ស្វ័យប្រវត្តិ (App Script)
                   </h3>
                   <p className="text-sm text-slate-600 leading-relaxed">
                     កូដ Apps Script នេះបង្កើតឡើងដើម្បីឱ្យអ្នក Copy ទៅដាក់ក្នុង Google Sheets ដោយចូលទៅកាន់ <strong>Extensions &gt; Apps Script</strong> ហើយ Paste កូដខាងក្រោម រួចចុច <strong>Run</strong> ដើម្បីបង្កើតទំព័រសន្លឹកកិច្ចការ (Sheets) ទាំង ៥៥ សម្រាប់សិស្សទាញយកទៅអនុវត្តបានភ្លាមៗ។
                   </p>
                   
                   <div className="relative group">
                     <div className="absolute top-3 right-3 flex gap-2">
                       <button
                         onClick={() => {
                           navigator.clipboard.writeText(generateAppScript());
                           alert("បានចម្លងកូដដោយជោគជ័យ (Copied to clipboard)!");
                         }}
                         className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/80 hover:bg-slate-800 text-white rounded text-xs font-semibold backdrop-blur-sm transition shadow-sm"
                       >
                         <ClipboardCopy className="w-4 h-4" />
                         Copy Code
                       </button>
                     </div>
                     <pre className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 text-sm font-mono overflow-auto max-h-96 shadow-inner whitespace-pre-wrap">
                       <code>
                         {`// Google Apps Script សម្រាប់បង្កើត Sheet លំហាត់ទាំង ៥៥ ស្វ័យប្រវត្តិ (គំរូសង្ខេប)
// ចុចប៊ូតុង "Copy Code" ដើម្បីទទួលបានកូដពេញលេញ រួច Paste ចូល Extensions -> Apps Script របស់អ្នក

function createAllExerciseSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var quests = getQuestsData();
  
  for (var i = 0; i < quests.length; i++) {
    // កូដសម្រាប់បង្កើត និង បញ្ចូលទិន្នន័យក្នុង Sheet នីមួយៗបន្ទាប់ពីនេះ...
    // មើលកូដពេញដោយចុចប៊ូតុង COPY ខាងលើ
  }
}
`}
                       </code>
                     </pre>
                   </div>
                </div>

              </div>
            </div>
          )}



          {activeTab === "tutorial" && selectedTutorialId && (
            <div className="space-y-6 animate-fade-in" id="tutorial-content">
              {(() => {
                const tutorial = lessonsList.find(l => l.id === selectedTutorialId);
                if (!tutorial) return null;
                return (
                  <div className="bg-white p-5 md:p-8 flex flex-col gap-6 rounded-2xl border border-slate-200 shadow-sm relative">
                    <button 
                      onClick={() => setActiveTab("overview")}
                      className="absolute top-4 right-4 md:top-6 md:right-6 text-slate-400 hover:text-slate-700 transition bg-slate-100 hover:bg-slate-200 p-1.5 rounded-full"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start border-b border-slate-100 pb-5 pt-2 gap-4">
                      <div className="pr-12">
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                          <BookOpen className="w-6 h-6 text-green-600 shrink-0" />
                          <span>{tutorial.titleKh}</span>
                        </h2>
                        <p className="text-sm text-slate-500 font-medium font-mono mt-2 ml-9">
                          {tutorial.titleEn}
                        </p>
                      </div>
                      <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-3 py-1 rounded-full whitespace-nowrap self-start">
                        រយៈពេល / Duration: {tutorial.duration}
                      </span>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mt-2 space-y-3">
                      <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm mb-3">
                        <Info className="w-5 h-5 text-slate-500" />
                        ខ្លឹមសារមេរៀន (Lesson Content)
                      </h3>
                      {tutorial.tutorialContent ? (
                        <div className="markdown-body prose prose-slate prose-sm max-w-none ml-7 text-slate-700">
                          <Markdown>{tutorial.tutorialContent}</Markdown>
                        </div>
                      ) : (
                        <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line ml-7">
                          {tutorial.descriptionKh}
                        </p>
                      )}
                      
                      <div className="mt-6 border-t border-slate-200 pt-5 ml-6">
                         {tutorial.id === "advanced-formulas" && (
                           <div className="mt-4 pt-4 border-t border-slate-100">
                             <h4 className="font-bold text-sm text-slate-800 mb-3 flex items-center gap-2">
                                <Database className="w-4 h-4 text-emerald-600" />
                                អនុវត្តន៍ផ្ទាល់ (Sandbox Practice)
                             </h4>
                             <button
                               onClick={() => {
                                 setActiveTab("overview");
                                 setSelectedQuestIdx(30);
                                 setTimeout(() => {
                                   document.getElementById("sandbox-container")?.scrollIntoView({ behavior: 'smooth' });
                                 }, 100);
                               }}
                               className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-[11px] font-bold transition flex items-center gap-2 cursor-pointer shadow-sm active:scale-95"
                             >
                               កន្លែងសាកល្បងសរសេររូបមន្ត (Practice Now)
                             </button>
                           </div>
                         )}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}



        </div>

        {/* Right column: informational sidebar based on theme guidelines */}
        <div className="lg:col-span-4 space-y-6">

          {/* Quick Stats sidebar info */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider border-b border-slate-100 pb-2">
              📊 ស្ថានភាពសិក្សារបស់អ្នក
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-600 font-semibold">មេរៀនបានបញ្ចប់៖</span>
                <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded font-extrabold">
                  {completedLessons.length} / {lessonsList.length}
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div 
                  className="bg-green-600 h-1.5 rounded-full transition-all duration-500" 
                  style={{ width: `${(completedLessons.length / lessonsList.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3 grid grid-cols-2 gap-2 text-center">
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <div className="text-xl font-extrabold text-blue-600">៤៥+</div>
                <div className="text-[9.5px] font-bold text-slate-500 uppercase leading-none mt-1">ឧទាហរណ៍អនុវត្ត</div>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <div className="text-xl font-extrabold text-emerald-600">១០០%</div>
                <div className="text-[9.5px] font-bold text-slate-500 uppercase leading-none mt-1">កម្មវិធីសិក្សាឥតគិតថ្លៃ</div>
              </div>
            </div>
          </div>

          {/* Instructions on Copying & Editing */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="space-y-3">
                <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-emerald-600" />
                  តើត្រូវចាប់ផ្ដើមដោយរបៀបណា? (How to Practice)
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-[11.5px] text-slate-600 pl-1 leading-relaxed">
                  <li>ចុចប៊ូតុង <strong className="text-emerald-700">“បង្កើតច្បាប់ចម្លង (Make a Copy)”</strong> ខាងក្រោម ដើម្បីចម្លងឯកសារនេះទៅក្នុង Google Drive ផ្ទាល់ខ្លួនរបស់អ្នក។</li>
                  <li>ប្រសិនបើអ្នកចង់មើលផ្ទាំងគំរូជាមុនសិន សូមចុចប៊ូតុង <strong className="text-slate-700">“មើលឯកសារគំរូ”</strong>។</li>
                  <li>បើកទៅកាន់ <span className="bg-amber-100 px-1 rounded text-amber-800 font-bold font-sans text-[10px]">Sheet ២ (Student Practice)</span> ហើយចាប់ផ្ដើមសរសេររូបមន្ត និងអនុវត្តការងារ។</li>
                  <li>បើមានចម្ងល់ ឬចង់ផ្ទៀងផ្ទាត់ឡើងវិញ អាចចុចមើល <span className="bg-sky-100 px-1 rounded text-sky-800 font-bold font-sans text-[10px]">Sheet ១ (Solution Reference)</span> ដើម្បីភាពច្បាស់លាស់។</li>
                </ol>
              </div>

              {/* Troubleshooting Card for Google's "File requested does not exist" Error */}
              <div className="bg-rose-50 border border-rose-200/80 p-4 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wide">
                  <span>⚠️ ដំណោះស្រាយករណីជួបបញ្ហាភ្ជាប់ ឬទំព័រ Google Sheets បង្ហាញកំហុស (Error)</span>
                </div>
                <p className="text-[11px] text-rose-950 leading-relaxed">
                  ប្រសិនបើការចុចលីងទៅកាន់ Google Sheets ជួបបញ្ហាស្ទះ ឬបង្ហាញសារថា <strong className="text-rose-700">"Sorry, the file you have requested does not exist"</strong> ដោយសារបញ្ហាឡុកអ៊ីនគណនី ឬការរឹតត្បិតសិទ្ធិពី Google Drive៖
                </p>
                <div className="bg-white/80 p-3 rounded-lg border border-rose-100 space-y-1.5 text-[11px] text-slate-700 font-medium">
                  <p className="font-extrabold text-rose-800">👉 វិធីដោះស្រាយដ៏សាមញ្ញ និងលឿនបំផុត ១០០% ៖</p>
                  <ol className="list-decimal list-inside space-y-1 pl-1 text-[10.5px]">
                    <li>ចុចប៊ូតុង <strong className="text-emerald-700">“📥 ទាញយកជាឯកសារ .XLSX”</strong> នៅផ្នែកខាងក្រោម។</li>
                    <li>បើកវិបសាយ Google Sheets មេរៀនថ្មីតាមដងផ្លូវកាត់៖ <a href="https://sheets.new" target="_blank" rel="noreferrer" className="text-blue-600 underline font-extrabold decoration-dashed">sheets.new</a></li>
                    <li>ចូលទៅកាន់ <strong className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded text-[10px]">File ➡ Import ➡ Upload</strong> រួចអូសឯកសារដែលបានទាញយកចូលជាការស្រេច! លោកអ្នកនឹងទទួលបានកិច្ចការស្វ័យប្រវត្តិកែសម្រួលបានភ្លាមៗ។</li>
                  </ol>
                </div>
              </div>

              {/* Google Workspace Setup Notice */}
              <div className="bg-sky-50/75 border border-sky-150 p-3 rounded-lg text-[10.5px] text-slate-650 font-medium leading-relaxed">
                 <em>ចំណាំ៖</em> អ្នកគ្រូ-លោកគ្រូ ក៏អាចយកតំណភ្ជាប់ Google Sheet នេះ ទៅចែករំលែកបញ្ចូលទៅក្នុង <strong>Google Classroom</strong> សម្រាប់ជាមេរៀន និងកិច្ចការផ្ទះដល់សិស្ស ដើម្បីហ្វឹកហាត់ស្វ័យប្រវត្តតាមប្រព័ន្ធការងារពិតៗបានផងដែរ!
              </div>

            </div>


          {/* Helpful references */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">🔗 ធនធានបន្ថែមស្វ័យសិក្សា</h4>
            <div className="space-y-2 text-xs">
              <a 
                href="https://developers.google.com/apps-script" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center justify-between p-2 hover:bg-slate-50 rounded text-slate-600 hover:text-blue-600 transition"
              >
                <span>Google Apps Script Doc</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://support.google.com/docs/answer/3093340?hl=en" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center justify-between p-2 hover:bg-slate-50 rounded text-slate-600 hover:text-blue-600 transition"
              >
                <span>បញ្ជីរូបមន្ត Google Sheets</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>


      {/* Styled Footer */}
      <footer id="app-footer" className="h-16 bg-white border-t border-slate-200 px-6 flex flex-col md:flex-row items-center justify-between shrink-0 text-xs text-slate-500 font-medium z-10 mt-12 gap-2">
        <div className="flex gap-6">
          <span>© ២០២៦ SheetMaster Course Academy</span>
          <span>សិទ្ធិគ្រប់យ៉ាងយោងតាមលក្ខខណ្ឌច្បាប់</span>
        </div>
        <div className="flex gap-4">
          <span>លក្ខខណ្ឌប្រើប្រាស់</span>
          <span>គោលការណ៍ឯកជនភាព</span>
        </div>
      </footer>

      {/* Dynamic Data Validation Helper handbook Modal */}
      {showValidationHelpModal && (
        <div className="fixed inset-0 bg-slate-900/65 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in" id="validation-help-modal">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400 animate-bounce" />
                <div>
                  <h3 className="font-extrabold text-[14px]">សៀវភៅជំនួយការបញ្ចូលទិន្នន័យ (Data Input Helper Guide)</h3>
                  <p className="text-[10px] text-slate-400">សូមអានច្បាប់រៀបចំដើម្បីជៀសវាងបញ្ហាសរសេរខុស ឬជាន់ទិន្នន័យ</p>
                </div>
              </div>
              <button 
                onClick={() => setShowValidationHelpModal(false)}
                className="text-slate-400 hover:text-white bg-slate-800 p-1.5 rounded-lg transition"
                id="close-validation-help-modal-header-btn"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable instructions handbook */}
            <div className="p-6 overflow-y-auto space-y-5 text-slate-700 text-xs">
              
              {/* Rules of Employee ID check */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-indigo-700 font-extrabold">
                  <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center text-[10px] font-mono">1</span>
                  <h4>ការការពារលេខសម្គាល់បុគ្គលិកស្ទួនគ្នា (Employee ID Validation)</h4>
                </div>
                <div className="bg-indigo-50/50 p-3 rounded-lg border border-indigo-100 space-y-1.5 ml-7 text-slate-650 leading-relaxed">
                  <p>
                     <strong>លេខសម្គាល់ ID </strong> គឺជាសោរចម្បង (Primary Key) សំរាប់កំណត់អត្តសញ្ញាណបុគ្គលិកម្នាក់ៗឱ្យបានច្បាស់លាស់ មិនអាចមានបុគ្គលិកពីរនាក់មានលេខ ID ដូចគ្នាឡើយ៖
                  </p>
                  <ul className="list-disc list-inside space-y-1 pl-1 text-[11px]">
                    <li>ទម្រង់ដែលណែនាំ៖ <span className="font-mono bg-indigo-200 px-1 py-0.5 rounded text-indigo-800 font-semibold text-[10px]">EMPXXX</span> (ឧទាហរណ៍៖ EMP005)</li>
                    <li>បើអ្នកសរសេរ ID ជាន់គ្នា នោះប្រព័ន្ធនឹងរារាំងមិនឱ្យបញ្ចូលទេ ព្រោះវានឹងបង្កជាផលវិបាកក្នុងការទាញយក និងគណនាទិន្នន័យ (VLOOKUP, INDEX, MATCH) ក្រោយពេលនាំចេញ។</li>
                    <li><strong>ដំណោះស្រាយ៖</strong> ចុចលើពាក្យ <span className="font-bold text-green-700 text-[11px] underline">🔄 ស្វ័យប្រវត្ត</span> ដើម្បីឱ្យប្រព័ន្ធគណនា និងផ្ដល់ជូនលេខសម្គាល់ទំនេរថ្មីចុងក្រោយបំផុតដោយស្វ័យប្រវត្ត។</li>
                  </ul>
                </div>
              </div>

              {/* Rules of Email Input Format */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-emerald-700 font-extrabold">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center text-[10px] font-mono">2</span>
                  <h4>ទម្រង់អ៊ីមែលត្រឹមត្រូវ (Email Format Validation)</h4>
                </div>
                <div className="bg-emerald-50/50 p-3 rounded-lg border border-emerald-100 space-y-1.5 ml-7 text-slate-650 leading-relaxed">
                  <p>
                     <strong>អ៊ីមែលបុគ្គលិក </strong> ប្រើប្រាស់សម្រាប់ការទំនាក់ទំនង និងការផ្ញើរបាយការណ៍បៀវត្សស្វ័យប្រវត្ត៖
                  </p>
                  <ul className="list-disc list-inside space-y-1 pl-1 text-[11px]">
                    <li>ទម្រង់ត្រូវតែមាន <span className="font-mono font-bold text-slate-900 bg-emerald-100 px-1 py-0.5 rounded text-[10px]">@</span> និងដែនត្រឹមត្រូវ (ឧទាហរណ៍៖ <span className="font-mono">name@gmail.com</span>, <span className="font-mono">company@co.kh</span>)។</li>
                    <li>មិនអាចមានដកឃ្លា (white space), តួអក្សរពិសេសក្រៅពីឈ្មោះដែន (@, .) នៅក្នុងកម្មវិធីអ៊ីមែលឡើយ។</li>
                    <li>បើអ៊ីមែលខុសទម្រង់ ប្រព័ន្ធនឹងលោតសញ្ញាគោះផ្អើល <span className="text-red-500 font-bold">⚠️</span> និងរារាំងការបង្កើតរហូតដល់កែរួចរាល់។</li>
                  </ul>
                </div>
              </div>

              {/* Troubleshooting Checklist */}
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 space-y-2">
                <h5 className="font-bold text-amber-800 uppercase tracking-wide flex items-center gap-1">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  តារាងផ្ទៀងផ្ទាត់បញ្ហានៅពេលបំពេញ (Form Checklist)
                </h5>
                <p className="text-[11px] text-amber-950 leading-relaxed">
                   ប្អូនៗត្រូវប្រាកដថា៖ <br />
                   • ឈ្មោះបុគ្គលិក មិនត្រូវបានទុកចោលទទេឡើយ។ <br />
                   • ភេទ និងផ្នែកការងារ ត្រូវបានជ្រើសរើសតាមជម្រើសដែលអាចរកបាន (Dropdown rules)។ <br />
                   • សញ្ញាព្រមានព័ណ៌ក្រហម <span className="text-red-500 font-bold">⚠️</span> ត្រូវបានដោះស្រាយទាំងអស់ រួចទើបចុចប៊ូតុង "បញ្ចូលថ្មី"។
                </p>
              </div>

            </div>

            {/* Footer */}
            <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => setShowValidationHelpModal(false)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2 rounded-xl transition duration-150"
                id="close-validation-help-modal-btn"
              >
                យល់ព្រម និងបិទ (Close Helper)
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Google Sheets Link Integration Modal */}
      {showGoogleSheetsModal && formulaQuests[selectedQuestIdx] && (
        <div className="fixed inset-0 bg-slate-900/65 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in" id="google-sheets-modal">
          <div className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-150 flex flex-col max-h-[90vh]">
            <div className="bg-emerald-600 text-white p-5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-xl">
                  <FileSpreadsheet className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-extrabold text-[15px]">ភ្ជាប់ទៅកាន់ Google Sheets គំរូ & អនុវត្ត</h3>
                  <p className="text-[10px] text-emerald-150">មេរៀនទី {formulaQuests[selectedQuestIdx]?.id?.split('-')[1] || ''}: {formulaQuests[selectedQuestIdx]?.titleKh}</p>
                </div>
              </div>
              <button onClick={() => setShowGoogleSheetsModal(false)} className="text-white hover:bg-emerald-700/50 p-1.5 rounded-lg transition duration-150"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-6 overflow-y-auto space-y-5 text-slate-700 text-xs flex-1">
              <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl space-y-3">
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded uppercase font-sans">កូដ Apps Script សម្រាប់ជួសជុលបញ្ហា (Code.gs)</span>
                <p className="text-slate-700 leading-relaxed text-[11px] mb-2">
                   <strong>១. រូបមន្ត និងការប្រើប្រាស់ (Formula & Usage)៖</strong> កូដនេះនឹងបង្កើតតារាងគំរូ និងបញ្ចូលរូបមន្តឆ្លើយតបដោយស្វ័យប្រវត្តិ។ <br/>
                   <strong>២. របៀបជួសជុលបញ្ហា File មិនស្គាល់៖</strong> ប្រសិនបើ Google Sheet មិនស្គាល់ឯកសារដែលបាន Download មក (Error), សូមលោកអ្នកប្រើប្រាស់កូដនេះជំនួសវិញ។ <br/>
                   <span className="italic text-emerald-700">របៀបប្រើ ➡ បើក Google Sheets ថ្មី &gt; ចុច <strong>Extensions</strong> &gt; <strong>Apps Script</strong> &gt; Paste កូដនេះចូល &gt; ចុច Save 💾 &gt; រួចចុច Run (▶️) នោះវានឹងបង្កើត Sheet អោយទាំងស្រុង។</span>
                </p>
                <div className="relative">
                  <pre className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-[10px] sm:text-[11px] overflow-auto max-h-[250px] whitespace-pre-wrap select-all">
{generateAppsScriptCode(formulaQuests[selectedQuestIdx])}
                  </pre>
                  <button 
                    onClick={() => {
                       navigator.clipboard.writeText(generateAppsScriptCode(formulaQuests[selectedQuestIdx]));
                       showToast("✓ បានចម្លងកូដ! សូមយកទៅ Paste ក្នុង Apps Script។");
                    }}
                    className="absolute top-2 right-2 bg-slate-700 hover:bg-slate-600 text-white rounded p-1.5 transition"
                  >
                    <ClipboardCopy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-emerald-600" />
                  តើត្រូវចាប់ផ្ដើមអនុវត្តងាយៗដោយរបៀបណា?
                </h4>
                <ol className="list-decimal list-inside space-y-1.5 text-[11px] text-slate-600 pl-1 leading-relaxed">
                  <li>ចុចប៊ូតុងពណ៌ខៀវ <strong className="text-sky-700">“ទាញយកជាទម្រង់ Excel ស្អាត (.XLSX)”</strong> នៅខាងក្រោម។</li>
                  <li>បើកវិបសាយ Google Sheets ថ្មីភ្លាមៗដោយគ្រាន់តែវាយ <a href="https://sheets.new" target="_blank" rel="noreferrer" className="text-blue-600 underline font-extrabold hover:text-blue-700">sheets.new</a> ក្នុង Browser របស់អ្នក។</li>
                  <li>ចូលទៅកាន់ <strong className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded text-[10px]">File ➡ Import ➡ Upload</strong> រួចអូសឯកសារនោះចូល។</li>
                  <li>ការកំណត់នេះនឹងផ្តល់ឱ្យសិស្សនូវឯកសារដែលមានភ្ជាប់រូបមន្តគំរូយ៉ាងច្បាស់លាស់។</li>
                </ol>
              </div>
            </div>
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row gap-2 justify-between items-stretch sm:items-center shrink-0">
              <button onClick={() => setShowGoogleSheetsModal(false)} className="text-slate-500 border border-slate-350 hover:bg-slate-100 font-bold text-[11px] px-4 py-2.5 rounded-xl transition duration-150 order-2 sm:order-1 cursor-pointer">បិទផ្ទាំងនេះ (Close)</button>
              <div className="flex flex-col sm:flex-row gap-2 order-1 sm:order-2">
                <button onClick={() => { handleDownloadSpreadsheet(); setShowGoogleSheetsModal(false); }} className="bg-sky-600 hover:bg-sky-500 text-white text-center font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-sm duration-150 flex items-center justify-center gap-1.5 cursor-pointer animate-bounce-subtle">
                  <FileSpreadsheet className="w-4 h-4 text-white" />
                  ទាញយកជាទម្រង់ Excel ស្អាត (.XLSX) 📥
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* CSV Import Guidelines Modal */}
      {showCsvGuidelinesModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full max-h-[90vh] flex flex-col animate-fade-in overflow-hidden border border-slate-100">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
              <div className="relative">
                <h3 className="font-extrabold text-slate-800 text-base flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-500" />
                  របៀបរៀបចំទម្រង់ឯកសារ CSV (CSV Protocol)
                </h3>
                <p className="text-[11px] text-slate-500 mt-1 font-medium">ការណែនាំជាជំហានៗដើម្បីនាំចូលទិន្នន័យ (Bulk Import) បានជោគជ័យ។</p>
              </div>
              <button
                onClick={() => setShowCsvGuidelinesModal(false)}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors relative z-10"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto custom-scrollbar space-y-6">
              
              <div className="space-y-3">
                <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  ១. រចនាសម្ព័ន្ធជួរឈរចាំបាច់ (Required Columns)
                </h4>
                <p className="text-[11px] text-slate-600 leading-relaxed pl-5">
                  សូមធ្វើការរៀបចំជួរឈរ (Columns) និងចំណងជើង (Headers) បេះបិទទៅតាមលំដាប់លំដោយ និងអក្ខរាវិរុទ្ធខាងក្រោមឲ្យបានត្រឹមត្រូវ៖
                </p>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 overflow-x-auto ml-5">
                  <table className="w-full text-left text-[11px]">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="pb-2 font-mono text-emerald-700 w-1/5">ឈ្មោះបុគ្គលិក</th>
                        <th className="pb-2 font-mono text-emerald-700 w-1/5">ភេទ</th>
                        <th className="pb-2 font-mono text-emerald-700 w-1/5">ផ្នែកការងារ</th>
                        <th className="pb-2 font-mono text-emerald-700 w-1/5">អ៊ីមែល</th>
                        <th className="pb-2 font-mono text-emerald-700 w-1/5">ស្ថានភាព</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-600 font-mono">
                      <tr className="border-b border-slate-100">
                        <td className="py-2">វ៉ាន់ ឌី</td>
                        <td className="py-2">ប្រុស</td>
                        <td className="py-2">រដ្ឋបាល</td>
                        <td className="py-2">vandy@example.com</td>
                        <td className="py-2">សកម្ម</td>
                      </tr>
                      <tr>
                        <td className="pt-2">សួន ស្រីនី</td>
                        <td className="pt-2">ស្រី</td>
                        <td className="pt-2">គណនេយ្យ</td>
                        <td className="pt-2">sreyny@example.com</td>
                        <td className="pt-2">សកម្ម</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  ២. ចំណុចត្រូវប្រុងប្រយ័ត្ន (Common Pitfalls)
                </h4>
                <ul className="text-[11px] text-slate-600 space-y-2 pl-5 list-disc list-inside leading-relaxed">
                  <li>រក្សាទុកឯកសាររបស់អ្នកក្នុងទម្រង់ជា <strong>.csv (Comma-Separated Values)</strong> ជានិច្ច មិនមែន .xlsx ឡើយ។</li>
                  <li>សូមកុំមានសញ្ញាក្បៀស (,) នៅក្នុងទិន្នន័យនៃជួរឈរណាមួយឡើយ ព្រោះវាអាចធ្វើឲ្យប្រព័ន្ធច្រឡំថាជាជួរឈរថ្មី។</li>
                  <li>ព័ត៌មាននៅក្នុងជួរឈរ "អ៊ីមែល" ត្រូវតែមានទម្រង់ជាអ៊ីមែលពិតប្រាកដ (ឧ. name@domain.com)។</li>
                  <li>ជៀសវាងការទុកចន្លោះទទេ (Empty Cells) ក្នុងជួរចាំបាច់។</li>
                  <li>ទិន្នន័យជួរទី១ ត្រូវតែជាជួរចំណងជើង (Header Row) ជានិច្ច (ឈ្មោះបុគ្គលិក,ភេទ,ផ្នែកការងារ,អ៊ីមែល,ស្ថានភាព)។</li>
                </ul>
              </div>

              <div className="bg-sky-50 border border-sky-100 rounded-xl p-4 flex gap-3 items-start md:items-center">
                <div className="p-2 bg-sky-100 rounded-lg shrink-0">
                  <Download className="w-5 h-5 text-sky-600" />
                </div>
                <div className="flex-1">
                  <h5 className="text-[11px] font-bold text-sky-800 mb-1">គំរូទម្រង់ត្រៀមស្រេច (Download Template)</h5>
                  <p className="text-[10px] text-sky-700/80 leading-relaxed">
                    ដើម្បីភាពងាយស្រួល លោកអ្នកអាចទាញយកសំណុំទិន្នន័យគំរូ។
                  </p>
                </div>
                <button 
                  onClick={downloadSampleCsv}
                  className="shrink-0 text-[10px] bg-white border border-sky-200 text-sky-700 font-bold px-3 py-1.5 rounded-lg shadow-sm hover:bg-sky-50 transition flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  ទាញយកគំរូ
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-slate-50 border-t border-slate-100 p-4">
               <button 
                onClick={() => setShowCsvGuidelinesModal(false)}
                className="w-full text-[11px] font-bold bg-slate-800 hover:bg-slate-700 text-white rounded-xl py-2.5 transition shadow-md flex items-center justify-center gap-1.5"
               >
                 <CheckCircle className="w-3.5 h-3.5" />
                 យល់ព្រម និងបិទ (Close)
               </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
