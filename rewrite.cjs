const fs = require('fs');
let s = fs.readFileSync('src/App.tsx', 'utf8');

const matchStr = 'const handleDownloadSpreadsheet = () => {';
const start = s.indexOf(matchStr);
const csvImportStr = '  // CSV Import States for Employee Management System';
const end = s.indexOf(csvImportStr);

let newFunc = `  const handleDownloadSpreadsheet = () => {
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
      ansRow[0] = "ចម្លើយរបស់រូបមន្ត ➡";
      ansRow[ansRow.length - 1] = "'" + currentQuest.correctAnswers[0]; 
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
  };\n\n`;

s = s.substring(0, start) + newFunc + s.substring(end);
fs.writeFileSync('src/App.tsx', s);
