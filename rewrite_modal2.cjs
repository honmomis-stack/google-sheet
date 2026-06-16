const fs = require('fs');
let s = fs.readFileSync('src/App.tsx', 'utf8');

const matchStr = '      {/* Google Sheets Link Integration Modal */}';
const start = s.indexOf(matchStr);
const endStr = '      {/* Admin CSV Download Modal */}';
const end = s.indexOf(endStr);

let newModal = [
"      {/* Google Sheets Link Integration Modal */}",
"      {showGoogleSheetsModal && (",
"        <div className=\"fixed inset-0 bg-slate-900/65 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in\" id=\"google-sheets-modal\">",
"          <div className=\"bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-150 flex flex-col max-h-[90vh]\">",
"            <div className=\"bg-emerald-600 text-white p-5 flex items-center justify-between shrink-0\">",
"              <div className=\"flex items-center gap-3\">",
"                <div className=\"bg-white/20 p-2 rounded-xl\">",
"                  <FileSpreadsheet className=\"w-6 h-6 text-white\" />",
"                </div>",
"                <div>",
"                  <h3 className=\"font-extrabold text-[15px]\">ភ្ជាប់ទៅកាន់ Google Sheets គំរូ & អនុវត្ត</h3>",
"                  <p className=\"text-[10px] text-emerald-150\">មេរៀនទី {formulaQuests[selectedQuestIdx].id.split('-')[1]}: {formulaQuests[selectedQuestIdx].titleKh}</p>",
"                </div>",
"              </div>",
"              <button onClick={() => setShowGoogleSheetsModal(false)} className=\"text-white hover:bg-emerald-700/50 p-1.5 rounded-lg transition duration-150\"><X className=\"w-4 h-4\" /></button>",
"            </div>",
"            <div className=\"p-6 overflow-y-auto space-y-5 text-slate-700 text-xs flex-1\">",
"              <div className=\"bg-emerald-50 border border-emerald-100 p-4 rounded-xl space-y-3\">",
"                <span className=\"text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded uppercase font-sans\">កូដ Apps Script សម្រាប់លោកគ្រូ អ្នកគ្រូ (Admin)</span>",
"                <p className=\"text-slate-700 leading-relaxed text-[11px] mb-2\">",
"                   លោកអ្នកអាចចម្លងកូដខាងក្រោមនេះ ទៅដាក់ក្នុង <strong>Extensions &gt; Apps Script</strong> នៃ Google Sheets ទទេមួយ ដើម្បីបង្កើតសន្លឹកកិច្ចការគំរូរួចរាល់ជូនសិស្សដោយស្វ័យប្រវត្តិ។",
"                </p>",
"                <div className=\"relative\">",
"                  <pre className=\"bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-[10px] overflow-auto max-h-[200px] whitespace-pre-wrap select-all\">",
"{\`function createPracticeSheet() {\\n" +
"  var ss = SpreadsheetApp.getActiveSpreadsheet();\\n" +
"  var sheet = ss.getActiveSheet();\\n" +
"  sheet.setName(\"${formulaQuests[selectedQuestIdx].titleKh}\");\\n\\n" +
"  var headers = ${JSON.stringify(formulaQuests[selectedQuestIdx].headers)};\\n" +
"  sheet.appendRow(headers);\\n" +
"  sheet.getRange(1, 1, 1, headers.length).setFontWeight(\"bold\").setBackground(\"#e2e8f0\");\\n\\n" +
"  var data = ${JSON.stringify(formulaQuests[selectedQuestIdx].tableData.map((row: any) => Object.keys(row).map(k => row[k])))};\\n" +
"  sheet.getRange(2, 1, data.length, headers.length).setValues(data);\\n\\n" +
"  var targetRow = data.length + 2;\\n" +
"  sheet.getRange(targetRow, 1).setValue(\"សរុប (Result) ➡\").setFontWeight(\"bold\");\\n" +
"  sheet.getRange(targetRow, headers.length).setValue('${formulaQuests[selectedQuestIdx].correctAnswers[0].replace(/'/g, \"\\\\'\")}');\\n" +
"}\`}",
"                  </pre>",
"                  <button ",
"                    onClick={() => {",
"                       navigator.clipboard.writeText(\"function createPracticeSheet() {\\n\" +",
"\"  var ss = SpreadsheetApp.getActiveSpreadsheet();\\n\" +",
"\"  var sheet = ss.getActiveSheet();\\n\" +",
"\"  sheet.setName(\\\"\" + formulaQuests[selectedQuestIdx].titleKh + \"\\\");\\n\\n\" +",
"\"  var headers = \" + JSON.stringify(formulaQuests[selectedQuestIdx].headers) + \";\\n\" +",
"\"  sheet.appendRow(headers);\\n\" +",
"\"  sheet.getRange(1, 1, 1, headers.length).setFontWeight(\\\"bold\\\").setBackground(\\\"#e2e8f0\\\");\\n\\n\" +",
"\"  var data = \" + JSON.stringify(formulaQuests[selectedQuestIdx].tableData.map((row: any) => Object.keys(row).map(k => row[k]))) + \";\\n\" +",
"\"  sheet.getRange(2, 1, data.length, headers.length).setValues(data);\\n\\n\" +",
"\"  var targetRow = data.length + 2;\\n\" +",
"\"  sheet.getRange(targetRow, 1).setValue(\\\"សរុប (Result) ➡\\\").setFontWeight(\\\"bold\\\");\\n\" +",
"\"  sheet.getRange(targetRow, headers.length).setValue('\" + formulaQuests[selectedQuestIdx].correctAnswers[0].replace(/'/g, \"\\\\'\") + \"');\\n\" +",
"\"}\");",
"                       showToast(\"✓ បានចម្លងកូដ! សូមយកទៅ Paste ក្នុង Apps Script។\");",
"                    }}",
"                    className=\"absolute top-2 right-2 bg-slate-700 hover:bg-slate-600 text-white rounded p-1.5 transition\"",
"                  >",
"                    <ClipboardCopy className=\"w-3.5 h-3.5\" />",
"                  </button>",
"                </div>",
"              </div>",
"              <div className=\"space-y-2\">",
"                <h4 className=\"font-bold text-slate-800 flex items-center gap-1.5\">",
"                  <Info className=\"w-4 h-4 text-emerald-600\" />",
"                  តើត្រូវចាប់ផ្ដើមអនុវត្តងាយៗដោយរបៀបណា?",
"                </h4>",
"                <ol className=\"list-decimal list-inside space-y-1.5 text-[11px] text-slate-600 pl-1 leading-relaxed\">",
"                  <li>ចុចប៊ូតុងពណ៌ខៀវ <strong className=\"text-sky-700\">“ទាញយកជាទម្រង់ Excel ស្អាត (.XLSX)”</strong> នៅខាងក្រោម។</li>",
"                  <li>បើកវិបសាយ Google Sheets ថ្មីភ្លាមៗដោយគ្រាន់តែវាយ <a href=\"https://sheets.new\" target=\"_blank\" rel=\"noreferrer\" className=\"text-blue-600 underline font-extrabold hover:text-blue-700\">sheets.new</a> ក្នុង Browser របស់អ្នក។</li>",
"                  <li>ចូលទៅកាន់ <strong className=\"text-slate-800 bg-slate-100 px-1 py-0.5 rounded text-[10px]\">File ➡ Import ➡ Upload</strong> រួចអូសឯកសារនោះចូល។</li>",
"                  <li>ការកំណត់នេះនឹងផ្តល់ឱ្យសិស្សនូវឯកសារដែលមានភ្ជាប់រូបមន្តគំរូយ៉ាងច្បាស់លាស់។</li>",
"                </ol>",
"              </div>",
"            </div>",
"            <div className=\"bg-slate-50 px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row gap-2 justify-between items-stretch sm:items-center shrink-0\">",
"              <button onClick={() => setShowGoogleSheetsModal(false)} className=\"text-slate-500 border border-slate-350 hover:bg-slate-100 font-bold text-[11px] px-4 py-2.5 rounded-xl transition duration-150 order-2 sm:order-1 cursor-pointer\">បិទផ្ទាំងនេះ (Close)</button>",
"              <div className=\"flex flex-col sm:flex-row gap-2 order-1 sm:order-2\">",
"                <button onClick={() => { handleDownloadSpreadsheet(); setShowGoogleSheetsModal(false); }} className=\"bg-sky-600 hover:bg-sky-500 text-white text-center font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-sm duration-150 flex items-center justify-center gap-1.5 cursor-pointer animate-bounce-subtle\">",
"                  <FileSpreadsheet className=\"w-4 h-4 text-white\" />",
"                  ទាញយកជាទម្រង់ Excel ស្អាត (.XLSX) 📥",
"                </button>",
"              </div>",
"            </div>",
"          </div>",
"        </div>",
"      )}\n\n"
].join('\n');

s = s.substring(0, start) + newModal + s.substring(end);
fs.writeFileSync('src/App.tsx', s);
