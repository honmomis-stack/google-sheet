import { formulaQuests } from "./lessonsData";

export const generateAppScript = () => {
  let script = `/**
 * Google Apps Script សម្រាប់បង្កើត Sheet លំហាត់ទាំង ៥៥ ស្វ័យប្រវត្តិ
 * សូម Copy កូដនេះទៅដាក់ក្នុង Extensions -> Apps Script នៃ Google Sheets របស់អ្នក
 * រួចចុច Run លើ function createAllExerciseSheets
 */

function createAllExerciseSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // បង្កើត Sheets ទាំងអស់
  const quests = getQuestsData();
  
  for (var i = 0; i < quests.length; i++) {
    var q = quests[i];
    var sheetName = q.titleKh.substring(0, 30); // ឈ្មោះ Sheet មិនអាចលើសពី 30 តួ
    
    var existingSheet = ss.getSheetByName(sheetName);
    
    // 1. បង្កើត Sheet ថ្មីដោយមិនទាន់ដាក់ឈ្មោះដើម ដើម្បីបញ្ចៀសបញ្ហា Error "You can't remove all the sheets"
    var sheet = ss.insertSheet();
    
    // 2. ប្រសិនបើមាន Sheet ឈ្មោះនេះរួចហើយ សូមលុបវាចោល
    if (existingSheet) {
      ss.deleteSheet(existingSheet);
    }
    
    // 3. ដាក់ឈ្មោះឱ្យ Sheet ថ្មី
    sheet.setName(sheetName);
    
    // រៀបចំទម្រង់ (Format)
    sheet.getRange("A1").setValue(q.titleKh).setFontWeight("bold").setFontSize(14).setFontColor("#15803d");
    sheet.getRange("A2").setValue(q.descriptionKh).setFontStyle("italic");
    sheet.getRange("A3").setValue(q.helperKh).setFontColor("#64748b");
    
    // បញ្ចូល Header
    if (q.headers && q.headers.length > 0) {
      var headerRange = sheet.getRange(5, 1, 1, q.headers.length);
      headerRange.setValues([q.headers]);
      headerRange.setFontWeight("bold").setBackground("#f1f5f9");
    }
    
    // បញ្ចូលទិន្នន័យ
    if (q.tableData && q.tableData.length > 0) {
      var dataRange = sheet.getRange(6, 1, q.tableData.length, q.tableData[0].length);
      dataRange.setValues(q.tableData);
    }
    
    // Format column width
    sheet.autoResizeColumns(1, 5);
  }
  
  Browser.msgBox("ជោគជ័យ", "បានបង្កើតសន្លឹកកិច្ចការទាំង " + quests.length + " រួចរាល់!", Browser.Buttons.OK);
}

function getQuestsData() {
  return [
`;

  formulaQuests.forEach((q, index) => {
    // extract values for tableData arrays
    const parsedData = q.tableData.map(row => {
      return Object.values(row).map(v => typeof v === 'string' ? v.replace(/"/g, '\\"') : v);
    });

    script += `    {
      titleKh: "${q.titleKh.replace(/"/g, '\\"')}",
      descriptionKh: "${q.descriptionKh.replace(/"/g, '\\"')}",
      helperKh: "${q.helperKh.replace(/"/g, '\\"')}",
      headers: ${JSON.stringify(q.headers)},
      tableData: ${JSON.stringify(parsedData)}
    }${index < formulaQuests.length - 1 ? ',' : ''}
`;
  });

  script += `  ];
}
`;

  return script;
};
