import { FormulaQuest, Lesson } from "../types";

export const lessonsList: Lesson[] = [
  {
    id: "basic-formulas",
    titleKh: "១. មូលដ្ឋានគ្រឹះរូបមន្ត (Basic Formulas)",
    titleEn: "1. Basic Formulas Sandbox",
    descriptionKh: "រៀនប្រើប្រាស់រូបមន្តមូលដ្ឋានដូចជា SUM, AVERAGE, COUNT, MIN, MAX និងរបៀបចាប់ផ្តើមសរសេរមុខងារក្រឡា។",
    difficulty: "ងាយស្រួល",
    duration: "២០ នាទី",
    icon: "Calculator"
  },
  {
    id: "employee",
    titleKh: "២. ប្រព័ន្ធគ្រប់គ្រងព័ត៌មានបុគ្គលិក",
    titleEn: "2. Employee Information System",
    descriptionKh: "បង្កើតតារាងផ្ទុកព័ត៌មានបុគ្គលិកលម្អិតដូចជា ថ្ងៃចូលធ្វើការ, ភេទ, ថ្ងៃខែឆ្នាំកំណើត, អត្តលេខ និងតួនាទី។",
    difficulty: "ងាយស្រួល",
    duration: "២៥ នាទី",
    icon: "Users",
    tutorialContent: `### តើអ្វីទៅជាប្រព័ន្ធគ្រប់គ្រងព័ត៌មានបុគ្គលិក?

ប្រព័ន្ធនេះជួយឲ្យអ្នករៀបចំទិន្នន័យបុគ្គលិកបានត្រឹមត្រូវ និងងាយស្រួលស្វែងរក។ នៅក្នុង Google Sheets យើងអាចប្រើប្រាស់ **Data Validation (Dropdown)** ដើម្បីទប់ស្កាត់ការវាយបញ្ចូលទិន្នន័យខុស។

**របៀបរៀបចំ Dropdown (Data Validation):**
1. ជ្រើសរើសជួរ (Column) ដែលអ្នកចង់ដាក់ Dropdown (ឧទាហរណ៍៖ កូឡោនប្រភេទការងារ)
2. ចុចលើម៉ឺនុយ **Data** > **Data validation**
3. ត្រង់ Criteria ជ្រើសរើសយក **Dropdown** (ឬ List of items)
4. វាយបញ្ចូលជម្រើសរបស់អ្នក (ឧ. IT, HR, Marketing)
5. ចុច Save។

ឥឡូវនេះ អ្នកគ្រាន់តែអាចជ្រើសរើសពីបញ្ជីឈ្មោះ ដោយមិនចាំបាច់វាយបញ្ចូលដោយដៃឡើយ ដែលជួយកាត់បន្ថយការសរសេរខុសអក្ខរាវិរុទ្ធ (Typo) បានរហូតដល់ទៅ ៩៩%!

អ្នកអាចត្រឡប់ទៅកាន់ផ្ទាំង **"គ្រប់គ្រងបុគ្គលិក"** ដើម្បីសាកល្បងចុចបញ្ចូលទិន្នន័យជាក់ស្តែង។`
  },
  {
    id: "text-functions",
    titleKh: "៣. រូបមន្តគ្រប់គ្រងអត្ថបទ (Text Functions)",
    titleEn: "3. Text Manipulation Sandbox",
    descriptionKh: "ប្រើប្រាស់ LEFT, RIGHT, MID, CONCATENATE ដើម្បើបំបែក និងច្របាច់បញ្ចូលគ្នាទិន្នន័យអត្ថបទក្នុង Excel។",
    difficulty: "មធ្យម",
    duration: "៣០ នាទី",
    icon: "Calculator"
  },
  {
    id: "conditional-logic",
    titleKh: "៤. លក្ខខណ្ឌកាត់សេចក្តី (IF Statements)",
    titleEn: "4. Conditional Logic Sandbox",
    descriptionKh: "ការប្រើប្រាស់រូបមន្ត IF, IFS, AND, OR ដើម្បីកំណត់លក្ខខណ្ឌឆ្លាតវៃក្នុងការរគណនាពិន្ទុ ឬប្រាក់រង្វាន់។",
    difficulty: "មធ្យម",
    duration: "៤៥ នាទី",
    icon: "Calculator"
  },
  {
    id: "payroll",
    titleKh: "៥. បញ្ជីបើកប្រាក់ខែ (Payroll System)",
    titleEn: "5. Payroll Management System",
    descriptionKh: "ប្រព័ន្ធបើកប្រាក់បៀវត្សដែលគណនាពីប្រាក់គោល, ម៉ោងបន្ថែម (OT), ប្រាក់អត្ថប្រយោជន៍ និងទាញយកពន្ធប្រាក់បៀវត្ស។",
    difficulty: "កម្រិតខ្ពស់",
    duration: "១ ម៉ោង",
    icon: "Coins",
    tutorialContent: `### ប្រព័ន្ធបើកប្រាក់បៀវត្ស និងពន្ធអាករ (Payroll & Tax)

នៅក្នុងប្រទេសកម្ពុជា ការគណនាប្រាក់ខែបុគ្គលិកត្រូវមានស្តង់ដាររួមមួយ ដែលពាក់ព័ន្ធភាគច្រើនទៅលើ **ប្រាក់បៀវត្សមូលដ្ឋាន (Base Salary)** ដក **ពន្ធប្រាក់បៀវត្ស (Salary Tax)** ដែលមានការបែងចែកជាន់ថ្នាក់។

ដើម្បីបង្កើតការគណនាស្វ័យប្រវត្តិក្នុង Google Sheets អ្នកត្រូវចេះប្រើងបណ្តុំរូបមន្ត \`IF()\` សមាស (Nested IFs)។
ដោយសារអត្រាពន្ធត្រូវបានបែងចែកជា 5 ថ្នាក់៖
- ក្រោម ១.៥ លានរៀល (០%)
- ១.៥ ទៅ ២ លានរៀល (៥%)
- ២ ទៅ ៨.៥ លានរៀល (១០%)
- ៨.៥ ទៅ ១២.៥ លានរៀល (១៥%)
- លើសពី ១២.៥ លានរៀល (២០%)

**រូបមន្តគណនាពន្ធដោយសង្ខេប (ឧបមាថា A1 គឺជាប្រាក់ខែគិតជារៀល):**
\`\`\`excel
=IF(A1<=1500000, 0,
 IF(A1<=2000000, (A1*5%)-75000,
 IF(A1<=8500000, (A1*10%)-175000,
 IF(A1<=12500000, (A1*15%)-600000,
 (A1*20%)-1225000))))
\`\`\`
*(ចំណាំ៖ តួលេខដកខាងចុង គឺជារូបមន្តសម្រួល ដែលក្រសួងហិរញ្ញវត្ថុបានផ្តល់សម្រាប់ប្រើប្រាស់ងាយៗ)*

អ្នកអាចកែតម្រូវទិន្នន័យប្រាក់ខែនៅក្នុង Interactive Sandbox កម្មវិធីនេះ ដើម្បីមើលលទ្ធផលប្រែប្រួលភ្លាមៗ។`
  },
  {
    id: "vlookup-index",
    titleKh: "៦. រូបមន្តទាញទិន្នន័យ (VLOOKUP & MATCH)",
    titleEn: "6. Lookup & Reference Sandbox",
    descriptionKh: "ស្វែងរក និងទាញយកទិន្នន័យពីតារាងមួយទៅតារាងមួយទៀតដោយស្វ័យប្រវត្តិ មិនបាច់វាយបញ្ចូលដោយដៃ។",
    difficulty: "កម្រិតខ្ពស់",
    duration: "៤៥ នាទី",
    icon: "Calculator"
  },
  {
    id: "data-validation",
    titleKh: "៧. សម្អាតទិន្នន័យ (Data Validation)",
    titleEn: "7. Data Cleaning & Filter Sandbox",
    descriptionKh: "ការបង្កើត Dropdown List និងលក្ខខណ្ឌទប់ស្កាត់ការបញ្ចូលទិន្នន័យខុស។",
    difficulty: "មធ្យម",
    duration: "៣០ នាទី",
    icon: "Calculator",
    tutorialContent: `### ការសម្អាតទិន្នន័យ និង Data Validation ទប់ស្កាត់ការវាយបញ្ចូលខុស

ក្នុងការងារជាក់ស្តែង ទិន្នន័យតែងតែមានភាពរញ៉េរញ៉ៃ (ឧ. វាយបញ្ចូលឈ្មោះមានចន្លោះដកឃ្លាច្រើន ឬវាយឈ្មោះខុសផ្នែក)។ នៅពេលអ្នកប្រើ Forms ឬបញ្ចូលទិន្នន័យដោយដៃ យើងត្រូវមានយន្តការការពារ។

**១. ការបង្កើត Dropdown List (Data Validation):**
ដើម្បីកុំឲ្យបុគ្គលិកវាយឈ្មោះ ឬមុខតំណែងខុសអក្ខរាវិរុទ្ធ (Typo):
1. ជ្រើសរើស Data > Data validation (នៅក្នុង Google Sheets)
2. បន្ថែម Rule ថ្មី ហើយជ្រើសរើស Criteria ជា **Dropdown**
3. បញ្ចូលជម្រើស (ឧទាហរណ៍៖ ប្រុស, ស្រី, គណនេយ្យ, រដ្ឋបាល)
4. ពេលនេះអ្នកគ្រាន់តែចុចរើសពីបញ្ជីរ ដោយមិនអាចវាយបញ្ចូលពាក្យផ្សេងបានឡើយ! (ការពារការបញ្ចូលឈ្មោះតាម Form ខុស)។

**២. រូបមន្តសម្រាប់សម្អាតទិន្នន័យដែលមានស្រាប់:**
* \`=TRIM(A2)\`: លុបចន្លោះដកឃ្លា (Space) លើសទំហំនៅក្បាល កណ្តាល ឬកន្ទុយអក្សរ។
* \`=PROPER(A2)\`: ប្តូរតួអក្សរដំបូងនៃពាក្យនីមួយៗឲ្យទៅជាអក្សរធំ។ ឧទាហរណ៍ "sok chea" ទៅជា "Sok Chea"។
* \`=UPPER(A2)\`: ប្តូរអក្សរទាំងអស់ជាអក្សរធំ។

**ការសាកល្បងអនុវត្ត៖**
សូមចូលទៅកាន់ផ្ទាំង **គ្រប់គ្រងបុគ្គលិក** ដើម្បីសាកល្បងប្រើប្រាស់ UI Dropdown សម្រាប់ការបញ្ចូលទិន្នន័យបុគ្គលិកដោយគ្មានកំហុស។`
  },
  {
    id: "finance",
    titleKh: "៨. បញ្ជីចំណូលចំណាយ (Income & Expense)",
    titleEn: "8. Income Expense Tracking",
    descriptionKh: "តាមដានលំហូរសាច់ប្រាក់ប្រចាំថ្ងៃ, បូកសរុបចំណូលតាមជម្រើស (Categories) ប្រើ SUMIFS ងាយៗ។",
    difficulty: "មធ្យម",
    duration: "៤០ នាទី",
    icon: "FileChartLine",
    tutorialContent: `### ប្រព័ន្ធកត់ត្រាចំណូលចំណាយស្វ័យប្រវត្តិ (Finance Tracker)

របាយការណ៍ហិរញ្ញវត្ថុ គឺជារឿងសំខាន់សម្រាប់តាមដានស្ថានភាពសេដ្ឋកិច្ចក្រុមហ៊ុន ឬផ្ទាល់ខ្លួន។ ដើម្បីធ្វើតារាងចំណូលចំណាយឲ្យមានភាពស្វ័យប្រវត្តិ អ្នកគួរប្រើក្បួន **SUMIFS** ដើម្បីបូកសរុបលុយតាមប្រភេទចំណាយ ឬចំណូល។

**រូបមន្តបូកសរុបមានលក្ខខណ្ឌច្រើន (SUMIFS):**
រូបមន្តនេះមានរបៀបសរសេរ៖ \`=SUMIFS(sum_range, criteria_range1, criterion1, [criteria_range2, criterion2, ...])\`

ឧទាហរណ៍៖ បើអ្នកចង់បូកសរុបតែលុយដែល "ចំណាយ" ដោយសារ "ថ្លៃទឹកភ្លើង" ប៉ុណ្ណោះ
1. កូឡោន C (ទឹកប្រាក់) ជា sum_range 
2. កូឡោន B (ប្រភេទ) ជា criteria_range
3. A (កាលបរិច្ឆេទ) ក៏អាចជ្រើសជារបាំងខែបានដែរ។

\`\`\`excel
=SUMIFS(C:C, B:B, "ទឹកភ្លើង", D:D, "ចំណាយ")
\`\`\`

**របៀបបង្កើតតារាងនេះ:**
1. បង្កើតសន្លឹក "ការកត់ត្រាប្រចាំថ្ងៃ" ជា Data Source ប្រអប់បញ្ជូល (មានថ្ងៃខែ, ចំណងជើងទំនិញ, ប្រភេទ, ទឹកប្រាក់, ចំណូល/ចំណាយ។ នេះមិនមែនសម្រាប់មើលទេ!)
2. បង្កើតសន្លឹក "របាយការណ៍ (Dashboard)" ដើម្បីមើល។ នៅទីនេះអ្នកប្រើរូបមន្ត \`SUMIFS\` ដើម្បីបូមទិន្នន័យពីសន្លឹក "ការកត់ត្រាប្រចាំថ្ងៃ" មកបូកសរុប។

អ្នកអាចសាកល្បងចុចបញ្ចូលប្រតិបត្តិការចំណូលនិងចំណាយនៅក្នុងកម្មវិធីនេះ ដើម្បីមើលក្រាហ្វិកប្រែប្រួល។`
  },
  {
    id: "advanced-formulas",
    titleKh: "៩. រូបមន្តគណនាស្មុគស្មាញ (SUMIFS & COUNTIFS)",
    titleEn: "9. Advanced Analytics Sandbox",
    descriptionKh: "បូកសរុប និងរាប់ចំនួនទិន្នន័យដោយផ្អែកលើលក្ខខណ្ឌច្រើនដូចជា ភេទ, ខែ, និងប្រភេទមុខទំនិញ។",
    difficulty: "កម្រិតខ្ពស់",
    duration: "៥០ នាទី",
    icon: "Calculator",
    tutorialContent: `### រូបមន្តគណនាស្មុគស្មាញ SUMIFS និង COUNTIFS

**១. ការរាប់ចំនួនតាមលក្ខខណ្ឌច្រើន (COUNTIFS):**
ប្រើសម្រាប់រាប់ចំនួនតួអង្គ ឬទិន្នន័យដែលស្របតាមលក្ខខណ្ឌ២ ឬច្រើនក្នុងពេលតែមួយ។
*ទម្រង់ទូទៅ:* \`=COUNTIFS(ជួរទី១, លក្ខខណ្ឌ១, ជួរទី២, លក្ខខណ្ឌ២, ...)\`

*ឧទាហរណ៍ជាក់ស្តែង:*
ឧបមាថាមានតារាង បុគ្គលិក જેમાંកូឡោន C គឺ "ភេទ" និង D គឺ "ផ្នែកការងារ"។ អ្នកចង់រាប់រក "បុគ្គលិកស្រី ដែលធ្វើការផ្នែកគណនេយ្យ"។
👉 \`=COUNTIFS(C:C, "ស្រី", D:D, "គណនេយ្យ")\`

**២. ការបូកសរុបតាមលក្ខខណ្ឌច្រើន (SUMIFS):**
ប្រើសម្រាប់បូកទឹកប្រាក់ ឬចំនួនលេខដោយមានលក្ខខណ្ឌច្រើន។ នេះជារូបមន្តដ៏សំខាន់បំផុតសម្រាប់ធ្វើការងារហិរញ្ញវត្ថុ ឬស្តុក។
*ទម្រង់ទូទៅ:* \`=SUMIFS(ជួរដែលត្រូវបូក, ជួរលក្ខខណ្ឌ១, លក្ខខណ្ឌ១, ជួរលក្ខខណ្ឌ២, លក្ខខណ្ឌ២, ...)\`

*ឧទាហរណ៍ជាក់ស្តែង:*
ឧបមាថាកូឡោន B គឺ "ប្រភេទចំណាយ" និង C គឺ "ខែ" ចំណែក E គឺ "ទឹកប្រាក់"។ អ្នកចង់បូកលុយចំណាយលើ "សម្ភារៈការិយាល័យ" នៅក្នុង "ខែ មករា" តែប៉ុណ្ណោះ។
👉 \`=SUMIFS(E:E, B:B, "សម្ភារៈការិយាល័យ", C:C, "មករា")\`

***គន្លឹះពិសេស:*** នៅក្នុងកន្លែងលក្ខខណ្ឌ អ្នកអាចប្រើសញ្ញាបញ្ជាក់ដូចជា \`">100"\` ដើម្បីបូកតែចំនួនណាដែលធំជាង ១០០ ល។ល។`
  },
  {
    id: "telegram",
    titleKh: "១០. តភ្ជាប់ Telegram Bot លោតសារ",
    titleEn: "10. Telegram Notification Integration",
    descriptionKh: "ប្រើប្រាស់ Apps Script ដើម្បីបញ្ជូនសារទៅកាន់ Telegram Group ពេលមានអ្នកបញ្ចូលទិន្នន័យថ្មី ឬទិញទំនិញចូលស្តុក។",
    difficulty: "មធ្យម",
    duration: "៣០ នាទី",
    icon: "Send",
    tutorialContent: `### ភ្ជាប់ Google Sheets ជាមូយ Telegram Bot

ដើម្បីស្នើសុំឲ្យមានសារលោតចូល Telegram រាល់ពេលមានការផ្លាស់ប្តូរទិន្នន័យ ឬមានគេបំពេញ Form ចូល Sheet របស់អ្នក អ្នកត្រូវអនុវត្តតាមបីជំហានខាងក្រោម៖

**ជំហានទី១៖ បង្កើត Bot នៅក្នុង Telegram**
1. បើកកម្មវិធី Telegram រួចស្វែងរកឈ្មោះ **@BotFather**
2. ចុច Start អោយវា រួចវាយពាក្យ \`/newbot\`
3. ដាក់ឈ្មោះ Bot របស់អ្នក (ឧ. \`My Company AlertBot\`)
4. ដាក់ username អោយវា (ត្រូវបញ្ចប់ដោយពាក្យ \`bot\` ឧ. \`mycompany_alert_bot\`)
5. BotFather នឹងផ្តល់ **Token** (ជាលេខកូដវែងៗ) មកអោយអ្នក។ *រក្សាវាទុកជាការសម្ងាត់កុំអោយអ្នកដទៃដឹង*។

**ជំហានទី២៖ យក Chat ID របស់អ្នក ឬ Group**
1. ស្វែងរក Bot ឈ្មោះ **@userinfobot** រួចចុច Start វានឹងប្រាប់ពី ID របស់អ្នក (ឧ. \`123456789\`)
2. បើចង់បញ្ជូនចូល Group សូម Add Bot ដែលអ្នកទើបបង្កើតចូល Group សិន រួច Add \`@RawDataBot\` ចូល Group នោះដើម្បីដឹង Chat ID របស់ Group (តែងតែមានសញ្ញាដក \`-\` នៅពីមុខ)។

**ជំហានទី៣៖ កូដ Google Apps Script (ផ្នែក Code.gs)**
សូមចូលទៅកាន់ **Extensions > Apps Script** ក្នុង Google Sheets រួច Copy កូដខាងក្រោមចូល៖

\`\`\`javascript
function sendTelegramMessage(text) {
  var token = "ដាក់_TOKEN_របស់អ្នកនៅទីនេះ";
  var chatId = "ដាក់_CHAT_ID_នៅទីនេះ";
  
  var url = "https://api.telegram.org/bot" + token + "/sendMessage";
  var payload = {
    "chat_id": chatId,
    "text": text,
    "parse_mode": "HTML"
  };
  
  var options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(payload)
  };
  
  UrlFetchApp.fetch(url, options);
}

// អនុគមន៍នេះនឹងរត់ពេលមានគេបំពេញទិន្នន័យ (ទាមទារអោយកំណត់ Trigger onEdit)
function onEdit(e) {
  if (!e) return;
  var row = e.range.getRow();
  var col = e.range.getColumn();
  
  // ឧទាហរណ៍៖ បើមានគេវាបញ្ចូលទិន្នន័យនៅ C2 (Col 3, Row 2)
  sendTelegramMessage("✅ មានទិន្នន័យថ្មីត្រូវបានបញ្ចូលនៅជួរទី " + row);
}
\`\`\` `
  },
  {
    id: "tutorial-ai-prompting",
    titleKh: "១១. របៀបសរសេរ Prompt បញ្ជា AI",
    titleEn: "11. Introduction to Prompt Engineering",
    descriptionKh: "រៀនពីរបៀបសរសេរបញ្ជា (Prompt) ChatGPT ឬ Gemini ឲ្យបង្កើតរូបមន្ត កូដ ឫដោះស្រាយបញ្ហាក្នុង Google Sheets ឲ្យចំគោលដៅ។",
    difficulty: "ងាយស្រួល",
    duration: "២០ នាទី",
    icon: "Brain",
    youtubeId: "R1vskYcv4G8",
    tutorialContent: `### របៀបសរសេរ Prompt ឲ្យបានលទ្ធផលល្អ

ការចេះសរសេរ Prompt ឬពាក្យបញ្ជាទៅកាន់ AI (ដូចជា ChatGPT ឬ Gemini) គឺជាជំនាញដែលមានតម្លៃបំផុតនៅសម័យកាលនេះ! បើអ្នកដឹងពីរបៀបបញ្ជា នោះ AI នឹងក្លាយជាកូនចៅដ៏ឆ្នើមរាប់សិបនាក់របស់អ្នក ដោយអ្នកគ្រាន់តែដើរតួជាអ្នកចាត់ចែងប៉ុណ្ណោះ។

---

#### 🌟 ក្បួន ៤ ចំណុចនៃការសរសេរ Prompt ដ៏មានប្រសិទ្ធភាព (R.C.T.F)

ជំនួសឲ្យការសួរសំណួរខ្លីៗមិនច្បាស់លាស់ សូមប្រើប្រាស់ក្បួនរចនាសម្ព័ន្ធ **៤ ចំណុច** នេះ៖

1. 🎭 **Role (តួនាទី):** កំណត់តួនាទីឲ្យ AI!
   *(ឧទាហរណ៍៖ "សន្មត់ថាអ្នកជាអ្នកជំនាញផ្នែក Google Sheets Data Analyst និងជំនាញខាងសរសេរកូដ Apps Script លំដាប់កំពូល។")*

2. 🌍 **Context (បរិបទពាក់ព័ន្ធ):** ប្រាប់ពីអ្វីដែលជាស្ថានភាពបច្ចុប្បន្នរបស់អ្នក។
   *(ឧទាហរណ៍៖ "ខ្ញុំមានតារាងមួយដែលមានកូឡោន A ដល់ G។ កូឡោន A ជាថ្ងៃខែ, កូឡោន C ជាឈ្មោះទំនិញ, និង D គឺជាចំនួនទឹកប្រាក់។ ជួរទី១ (Row 1) គឺជាក្បាលតារាង។")*

3. 🎯 **Task (កិច្ចការជាក់លាក់):** ប្រាប់អ្វីដែលអ្នកចង់បានឲ្យបានច្បាស់។
   *(ឧទាហរណ៍៖ "ខ្ញុំចង់បានរូបមន្តមួយសម្រាប់បូកសរុបប្រាក់ចំណូល (កូឡោន D) សម្រាប់តែទំនិញដែលជា 'កុំព្យូទ័រ' (កូឡោន C) និងលក់ចេញក្នុងខែមករាប៉ុណ្ណោះ។")*

4. 📝 **Format (ទម្រង់ទិន្នផល):** ប្រាប់ពីរបៀបរៀបចំចម្លើយដែលអ្នកចង់បាន។
   *(ឧទាហរណ៍៖ "សូមបង្ហាញរូបមន្តមកអោយត្រង់តែម្តង បូករួមទាំងការពន្យល់ខ្លីៗ។")*

---

#### 🚫 ឧទាហរណ៍ជាក់ស្តែង៖ ការបញ្ជាខុស vs ការបញ្ជាត្រូវ

**❌ ការសរសេរខុស (Bad Prompt):**
> "ធ្វើម៉េចបូកលុយ?" ឬ "សរសេររូបមន្ត SUM ឲ្យមួយមក"
*(AI មិនដឹងថាអ្នកចង់បូកលុយអ្វី នៅកូឡោនទីប៉ុន្មាន មានលក្ខខណ្ឌអ្វីខ្លះនោះទេ។ លទ្ធផលបានមកនឹងគ្រាន់តែជាការអធិប្បាយទូទៅ។)*

**✅ ការសរសេរត្រូវ (Good Prompt):**
> "អ្នកគឺជាអ្នកជំនាញ Google Sheets ម្នាក់ដែលខ្ញុំជួលមក។ ខ្ញុំកំពុងគ្រប់គ្រងបញ្ជីចំណូលចំណាយ។ \n> ទិន្នន័យខ្ញុំមាននៅកូឡោន C (ទឹកប្រាក់) និងកូឡោន B (ប្រភេទចំណាយ)។ សូមសរសេររូបមន្ត SUMIFS ដោយបូកទឹកប្រាក់នៅកូឡោន C តែសម្រាប់ប្រភេទដែលមានឈ្មោះថា 'ចំណាយលើភ្លើង' នៅកូឡោន B ទាន់ទេ? សូមសរសេររូបមន្តមកអោយបានចំៗ!"

---

#### 🧠 គន្លឹះពិសេស សម្រាប់គ្រូពេទ្យកែ Error
នៅពេលដែលអ្នកថតចម្លង (Copy) រូបមន្តពី AI ទៅដាក់ក្នុង Sheets របស់អ្នក ហើយលោតសញ្ញា Error (ឧ. \`#N/A\`, \`#ERROR!\`, ឬ \`#VALUE!\`) កុំទាន់អាលចុះចាញ់! ចូរប្រើ **Prompt ជួសជុលបញ្ហា** យ៉ាងដូច្នេះ៖

> "រូបមន្តដែលអ្នកឲ្យខ្ញុំប្រើអម្បាញ់មិញ វាលោតចេញ Error បែបនេះ: 'Formula parse error'។ តើអាចមកពីអ្វី? សូមកែសម្រួលរូបមន្តនោះឡើងវិញអោយ។ (បញ្ជាក់: កុំព្យូទ័រខ្ញុំប្រើសញ្ញាបញ្ចុះក្បៀស មិនមែនក្បៀសទេ (ឧទាហរណ៍ \`;\` ជំនួស \`,\` )"

---

#### 🏗️ គំរូនៃរចនាសម្ព័ន្ធ Prompt (Copy យកទៅប្រើបាន!)

> "សន្មត់ថាអ្នកជាអ្នកជំនាញពូកែ [Google Sheets/Apps Script]។
> ខ្ញុំចង់ឲ្យអ្នកជួយខ្ញុំ [រៀបរាប់ពីបញ្ហា]។
>
> នេះជារចនាសម្ព័ន្ធតារាងខ្ញុំបច្ចុប្បន្ន៖
> - កូឡោន [A] ផ្ទុក [កាលបរិច្ឆេទ]
> - កូឡោន [B] ផ្ទុក [ប្រភេទ]
> - កូឡោន [C] ផ្ទុក [ទឹកប្រាក់]
> 
> **លក្ខខណ្ឌ:**
> 1. [ត្រូវធ្វើយ៉ាងម៉េចខ្លះ]
> 2. [ប្រសិនបើអីចេះ តើត្រូវចេញយ៉ាងម៉េច?]
> 
> សូមផ្តល់រូបមន្តមកខ្ញុំ និងពន្យល់ពីរបៀបដែលវាដំណើរការមួយៗ!"`
  },
  {
    id: "tutorial-html-web-app",
    titleKh: "១២. បង្កើត Web App ដោយប្រើ HTML",
    titleEn: "12. Build Web App form with Apps Script",
    descriptionKh: "យល់ដឹងពីរបៀបផ្សំ HTML រួមជាមួយ Code.gs ដើម្បីបង្កើតតារាងបញ្ចូលទិន្នន័យទំនើបចូលទៅក្នុង Google Sheets។",
    difficulty: "មធ្យម",
    duration: "៤០ នាទី",
    icon: "Code",
    youtubeId: "vBnm4Y2l1w0",
    tutorialContent: `### រៀបចំបណ្តាញសាយ Web App ដោយមាន HTML និង Apps Script

Google Sheets ក្រៅពីជាតារាង វាក៏អាចប្រែក្លាយជា **ម៉ាស៊ីនមេ (Server)** សម្រាប់បង្ហោះប្រព័ន្ធចុះឈ្មោះ (Web App) ដ៏ស្រស់ស្អាតផងដែរ ដោយយើងរួមបញ្ចូលគ្នារវាង **Google Apps Script (Code.gs)** និង **HTML**។

---

#### 🛠️ រចនាសម្ព័ន្ធចាំបាច់នៃ Web App នៅក្នុង Apps Script
ដើម្បីបង្កើត Web App មួយដំណើរការទៅបាន អ្នកត្រូវមានឯកសារ (Files) យ៉ាងហោចណាស់ចំនួន ២ ដាច់ដោយឡែកពីគ្នានៅក្នុងផ្នែក Extensions > Apps Script ៖

1. **Code.gs (Backend Server):** ដើរតួជាអ្នកអនុម័ត ទទួលទិន្នន័យ ទាញទិន្នន័យពី Sheet និងបញ្ចាំងទំព័រ HTML។
2. **Index.html (Frontend UI):** ដើរតួជាផ្ទាំង Interface រូបរាង (អាចមាន CSS និង JavaScript ផងដែរ)។

---

#### 📝 ១. កូដសម្រាប់ផ្នែក Server (Code.gs)

\`\`\`javascript
// 1. អនុគមន៍ doGet() ជាតម្រូវការដាច់ខាត (Must-have)! 
// នៅពេលគេចូល Link Web App របស់អ្នក វាជាអ្នកបញ្ចាំងផ្ទាំង Index.html ឲ្យឃើញ
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('ប្រព័ន្ធប្រមូលព័ត៌មានអតិថិជន') // កំណត់ចំណងជើងសាយ
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL) // អនុញ្ញាតឲ្យបង្កប់ក្នុងវែបសាយផ្សេង (iframe)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1'); // ឲ្យត្រូវរាងលើទូរស័ព្ទដៃ
}

// 2. អនុគមន៍សម្រាប់ទទួលយកទិន្នន័យដែល Index.html បាញ់បញ្ជូនមក
function saveDataToSheet(data) {
  // ចាប់យកផ្ទាំង Sheet សកម្មបច្ចុប្បន្ន
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // បន្ថែមនៅជួរបន្ទាប់ (ជួរចុងក្រោយ) នូវទិន្នន័យថ្មីមួយជួរ
  sheet.appendRow([
    new Date(),   // Col A: ម៉ោងនិងថ្ងៃខែដែលបានបញ្ជូនកូដ
    data.name,    // Col B: ឈ្មោះ
    data.gender,  // Col C: ភេទ
    data.phone    // Col D: លេខទូរស័ព្ទ
  ]);
  
  return "ទិន្នន័យត្រូវបានរក្សាទុកដោយជោគជ័យនៅក្នុង Google Sheets!";
}
\`\`\`

---

#### 🎨 ២. កូដសម្រាប់ផ្ទាំង Interface (Index.html)

អ្នកត្រូវបង្កើត File ថ្មីមួយនៅក្នុង Apps Script ដោយចុចសញ្ញា \`+\` ជ្រើសយក **HTML** រួចដាក់ឈ្មោះវាថា "Index"។

\`\`\`html
<!DOCTYPE html>
<html>
  <head>
    <!-- ប្រើប្រាស់ Tailwind CSS ដើម្បីអោយការរចនាមានភាពទំនើប និងលឿន -->
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-slate-100 min-h-screen flex items-center justify-center p-4">
    
    <div class="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold text-slate-800 mb-6 text-center">ទម្រង់បញ្ចូលព័ត៌មាន</h2>
      
      <!-- Input fields -->
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">ឈ្មោះពេញ</label>
          <input type="text" id="name" class="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="ឧ. កែវ ចាន់">
        </div>
        
        <div>
           <label class="block text-sm font-medium text-slate-700 mb-1">ភេទ</label>
           <select id="gender" class="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="ប្រុស">ប្រុស</option>
              <option value="ស្រី">ស្រី</option>
           </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">លេខទូរស័ព្ទ</label>
          <input type="text" id="phone" class="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="012 345 678">
        </div>

        <!-- Submit Button -->
        <button onclick="submitForm()" id="btnSubmit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition mt-4">
          បញ្ជូនទិន្នន័យ (Submit)
        </button>
        
      </div>
    </div>

    <script>
      function submitForm() {
        // 1. ប្រមូលទិន្នន័យពី Input កុងប្រអប់
        const data = {
          name: document.getElementById('name').value,
          gender: document.getElementById('gender').value,
          phone: document.getElementById('phone').value
        };
        
        // ពិនិត្យថាមានទទេរបំពេញឬអត់
        if(!data.name || !data.phone) {
           alert("សូមបំពេញឈ្មោះ និងលេខទូរស័ព្ទ!");
           return;
        }

        // ប្តូរ Button ទៅជាកំពុងដំណើរការ
        const btn = document.getElementById('btnSubmit');
        btn.innerText = "កំពុងប្រមូលបញ្ជូន...";
        btn.disabled = true;

        // 2. ប្រើ google.script.run ដើម្បីបញ្ជូន Data ទៅកាន់ function saveDataToSheet នៅក្នុង Code.gs
        google.script.run
          .withSuccessHandler(function(responseServer) {
              // កូដដំណើរការនៅពេល Server ឆ្លើយតបជោគជ័យ
              alert(responseServer);
              
              // ជូតទិន្នន័យចោល ដើម្បីឲ្យគេវាយថ្មីបាន
              document.getElementById('name').value = '';
              document.getElementById('phone').value = '';
              btn.innerText = "បញ្ជូនទិន្នន័យ (Submit)";
              btn.disabled = false;
          })
          .withFailureHandler(function(error) {
              alert("បញ្ហា៖ " + error.message);
              btn.innerText = "បញ្ជូនទិន្នន័យ (Submit)";
              btn.disabled = false;
          })
          .saveDataToSheet(data);
      }
    </script>
  </body>
</html>
\`\`\`

---

#### 🚀 របៀប Deploy អោយចេញជាវេបសាយពិតៗ (URL)

ដើម្បីអោយអ្នកខាងក្រៅអាចចូលចិត្តពុម្ភបញ្ជូលនេះបាន អ្នកត្រូវ **Deploy** វាក្លាយជា URL ផ្លូវការ៖

1. នៅផ្នែកខាងលើស្តាំនៃកូដ សូមចុចប៊ូតុង **Deploy** យកពាក្យ **"New deployment"**។
2. ចុចសញ្ញាកងចក្រ ជ្រើសរើសប្រភេទ **"Web app"**។
3. ត្រង់ **Execute as**: ជ្រើសរើសយកឈ្មោះ Email របស់អ្នកផ្ទាល់ (Me)។
4. ត្រង់ **Who has access**: លើទម្រង់សាធារណៈ ចូរជ្រើសរើស **"Anyone"** អោយអ្នកណាក៏មានសិទ្ធិចូលបញ្ជូលទិន្នន័យបាន (ទោះអត់មាន Google Account ក៏ដោយ!)។
5. ចុច **Deploy** (ជាលើកដំបូងវានឹងសួររកការ Authorize សិទ្ធិ ដូចនេះសូម Allow Access ទាំងអស់)។
6. អ្នកនឹងទទួលបាន **Web app URL** រួចថតចម្លងលីងវាផ្ញើអោយអ្នកផ្សេងបំពេញទៅជាការស្រេច! 🎉`
  },
  {
    id: "tutorial-supabase-integration",
    titleKh: "១៣. ទាញតម្លៃទំនិញពីប្រព័ន្ធ Database ពិតប្រាកដ",
    titleEn: "13. Supabase Integration",
    descriptionKh: "ប្រើប្រាស់ការ Fetch API ដើម្បីទាញតម្លៃទំនិញពីប្រព័ន្ធ Supabase យកមកដាក់ក្នុង Google Sheets ទោះមានឈ្មោះទំនិញរាប់ម៉ឺនមុខ។",
    difficulty: "កម្រិតខ្ពស់",
    duration: "៥០ នាទី",
    icon: "Database",
    youtubeId: "Ww7aU30WJvE",
    tutorialContent: `### ការភ្ជាប់ Google Sheets ទីកាន់ប្រព័ន្ធទិន្នន័យពិតប្រាកដ (Supabase Database)

នៅពេលដែលសហគ្រាសរបស់អ្នកមានការរីកចម្រើន ហើយមានទិន្នន័យស្តុករាប់សែនមុខ រឺបញ្ជីអតិថិជនរាប់ម៉ឺននាក់ ការប្រើប្រាស់ត្រឹម Google Sheets ផ្តាច់មុខនឹងធ្វើឲ្យមានបញ្ហាគាំង រឺយឺតយ៉ាងខ្លាំង។ ដំណោះស្រាយដ៏ពេញនិយមគឺការចាកចេញពី Google Sheets ទៅកាន់ប្រព័ន្ធ Database ពិតប្រាកដដូចជា PostgreSQL (ឧទាហរណ៍៖ **[Supabase](https://supabase.com/)** ជម្រើសឥតគិតថ្លៃ និងខ្លាំងក្លា)។

ប៉ុន្តែអ្នកគ្រាន់តែប្តូរការផ្ទុក (Storage) ប៉ុណ្ណោះ ចំណែកឯផ្ទាំងការងារ អ្នកនៅតែអាចប្រើប្រាស់ Google Sheets ជាផ្ទាំង Dashboard បានដដែល! យន្តការនៅពីក្រោយគឺ **API (Application Programming Interface)**។

---

#### 🌐 តើអ្វីទៅជាការ Fetch API?
API ក៏ដូចជា "អ្នករត់តុអនឡាញ" ដែលរត់ពីកុំព្យូទ័រអ្នក ទៅយកទិន្នន័យពីម៉ាស៊ីន Database នៅអាមេរិក រួចមកបង្ហាញលើ Google Sheets វិញក្នុងរយៈពេលមួយប៉ព្រិចភ្នែក។ ដើម្បីហៅពឹងអ្នករត់តុនេះបាន នៅក្នុង Apps Script មានពាក្យបញ្ជាពិសេសមួយឈ្មោះថា \`UrlFetchApp\`។

---

#### 🗄️ វិធីសាស្ត្រតភ្ជាប់ (សុំកូដពី AI)
អ្នកអាចសុំឲ្យ AI ជួយសរសេររលក្ខណៈបែបនេះ៖

> "ខ្ញុំចង់ភ្ជាប់ Project របស់ខ្ញុំនៅ Supabase។ តារាងរបស់ខ្ញុំមានឈ្មោះកូដថា \`products\`។ សូមជួយសរសេរកូដ Apps Script ដើម្បី GET (ទាញយក) លេខកូដ និងឈ្មោះទំនិញទាំងអស់ពីប្រព័ន្ធយកមកដាក់ក្នុង Sheet វិញ។
> 
> *សេចក្តីបញ្ជាក់លម្អិត:* 
> 1. សូមរៀបចំ \`options\` ដែលមាន headers ទាមទារសម្រាប់ \`apikey\` របស់ Supabase និង \`Authorization\` Bearer Token ដាច់ដោយឡែកផងដែរ។ 
> 2. ចាប់យកនូវសាច់ JSON លទ្ធផលដែលបានមក ធ្វើការ Loop បញ្ចូលទៅក្នុង Active Sheet ចាប់ពី Column A និង B ដោយលុបទិន្នន័យចាស់ៗចោលជាមុនសិន។"

---

#### 🧩 កូដដែលយើងនឹងទទួលបាន (ការទាញទិន្នន័យចុះ / GET Data):

\`\`\`javascript
function fetchSupabaseData() {
  // 1. URL ភ្ជាប់ទៅកាន់ប្រព័ន្ធ API Database ផ្ទាល់របស់អ្នក
  // (ប្តូរលេខកូដកណ្តាលនេះ ទៅជាលេខកូដ Project អ្នកផ្ទាល់)
  const url = "https://<your-project-id>.supabase.co/rest/v1/products?select=id,name";
  
  // 2. កូនសោរសម្ងាត់អភ័យឯកសិទ្ធិ (Anon Key)
  const apikey = "YOUR_ANON_KEY"; 
  
  // 3. រៀបចំផែនទី និងសំណុំបែបបទទៅប្រាប់ខាង API អោយទម្លាក់ទិន្នន័យមកអោយ
  const options = {
    "method" : "get", // ខ្ញុំចង់ហៅទាញយក (អត់មែនយកទៅចោលទេ)
    "headers" : {
      "apikey": apikey,
      "Authorization": "Bearer " + apikey, // ស្នាមមេដៃបញ្ជាក់ពីភាពជាម្ចាស់
      "Content-Type": "application/json"
    }
  };
  
  // 4. ចាប់ផ្តើមធ្វើការពឹង "អ្នករត់តុ" UrlFetchApp អោយទៅយក Data ដុំធំមក
  const response = UrlFetchApp.fetch(url, options);
  
  // 5. បកប្រែភាសា JSON Data របស់កុំព្យូទ័រ អោយមកជា Array ដែល Javascript យល់
  const data = JSON.parse(response.getContentText());
  
  // 6. រកមើលក្រដាស់ Sheet ដែលយើងកំពុងចូលមើល
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // 7. (សំខាន់) ជូតសម្អាតក្ដារខៀន ឬទិន្នន័យចាស់ៗចោលសិន ចាប់ពីបន្ទាត់ទី ២ ដល់ចុងក្រោយ
  sheet.getRange("A2:B" + sheet.getMaxRows()).clear();
  
  // 8. រៀបចំប្រអប់ Array ទទេរមួយសម្រាប់ផ្ទុកទិន្នន័យថ្មីដែលបាញ់ចូលពី Supabase
  let rows = [];
  data.forEach(item => {
    // រៀបបញ្ចូលក្នុងជួរជាលក្ខណៈ Column A, Column B
    rows.push([item.id, item.name]);
  });
  
  // 9. ចាក់ទិន្នន័យទាំងអស់ចូលទៅក្នុង Sheet តែម្តងឲ្យលឿន (កុំចាក់ម្តងមួយៗអោយសោះព្រោះយឺតខ្លាំង)
  if(rows.length > 0) {
    sheet.getRange(2, 1, rows.length, 2).setValues(rows);
  }
}
\`\`\`

#### 🚀 គោលការណ៍នៃអត្ថប្រយោជន៍ (Best Practice)
ដូចជំហានទី ៩ ខាងលើ ពេលដែលត្រូវបញ្ជូលទិន្នន័យម្តង រាប់រយជួរ យើងដាច់ខាត **មិនត្រូវប្រើការ Loop រៀបចំបញ្ជូលម្តងមួយបន្ទាត់ (appendRow)** នោះឡើយ ព្រោះវានឹងចំណាយពេលយូរខ្លាំង។ យើងត្រូវរៀបវាដាក់ក្នុង Array (ថតឯកសារធំ) មួយអោយហើយសិន រួចចាំប្រើ \`setValues()\` បញ្ចូលទិន្នន័យរាប់ពាន់ជួរតែមួយពព្រិចភ្នែកជំនួសវិញ!`
  },
  {
    id: "tutorial-ai-self-study",
    titleKh: "១៤. តើត្រូវរៀនសួរ AI ដោយខ្លួនឯងយ៉ាងដូចម្តេច?",
    titleEn: "14. How to Use AI as Your Mentor",
    descriptionKh: "វិធីសាស្ត្រក្នុងការក្លាយទៅជាសិស្សដ៏ពូកែម្នាក់ ដោយចេះបកប្រែបញ្ហាខ្លួនឯងឲ្យ AI ជួយពន្យល់និងរកដំណោះស្រាយកូដ។",
    difficulty: "ងាយស្រួល",
    duration: "១៥ នាទី",
    icon: "GraduationCap",
    youtubeId: "aG_X_lFjM7o",
    tutorialContent: `### តើធ្វើដូចម្តេចដើម្បីអោយ AI ក្លាយជាគ្រូផ្ទាល់ខ្លួន (AI as a Mentor)?

បើអ្នកចេះសួរ អ្នកនឹងមានគ្រូបង្រៀនដ៏ឆ្នើមម្នាក់នៅក្បែរខ្លួន ២៤ ម៉ោងក្នុងមួយថ្ងៃ ៧ថ្ងៃក្នុងមួយសប្តាហ៍ ដោយឥតគិតថ្លៃ! AI (ដូចជា ChatGPT/Gemini) មិនត្រឹមតែជាអ្នកសរសេរកូដឲ្យអ្នកប៉ុណ្ណោះទេ តែអ្នកអាចចាត់ទុកវាជាគ្រូ និងជាដៃគូពិភាក្សាផងដែរ។

---

#### 💡 ១. វិធីសុំការពន្យល់ពេលអ្នកមិនយល់ (Explanation Request)
នៅពេលអ្នកចម្លង (Copy) កូដពីកន្លែងណាមួយតែអ្នកមិនយល់ថាវាដើរទាក់ទងគ្នាបែបណា សូមសួរ AI ដោយត្រង់ៗ៖

> "ខ្ញុំឃើញគេប្រើរូបមន្តនេះ \`=VLOOKUP(A2, C:D, 2, FALSE)\` តែខ្ញុំអត់យល់ពីវាទាល់តែសោះ។ សូមពន្យល់វាឲ្យខ្ញុំយល់ជាភាសាខ្មែរ ហើយពន្យល់ដូចកំពុងពន្យល់ក្មេងថ្នាក់ទី ៧ ឲ្យងាយយល់បំផុត។"

---

#### 🐛 ២. វិធីសាស្ត្រក្នុងការជួសជុលបញ្ហា (Debugging & Error Fix)
គ្មានអ្នកណាដែលអត់ធ្មត់ជាង AI នៅពេលដែលត្រូវដោះស្រាយ Error ច្រើនដងត្រួតគ្នានោះទេ! ពេលអ្នករត់កម្មវិធី (Apps Script) ហើយបរាជ័យលោតព៌ណក្រហម ចូរកុំភ័យ គ្រាន់តែអនុវត្តតាមគំរូនេះ៖

> "ខ្ញុំបាន Copy កូដអ្នកឲ្យអម្បាញ់មិញ រួចយកទៅរត់ ស្រាប់តែវាចេញ Error ពណ៌ក្រហមបែបនេះ ៖
> \`TypeError: Cannot read properties of null (reading 'getRange')\` 
> តើមូលហេតុមកពីអ្វី? ហើយខ្ញុំគួរកែត្រង់ណា? សូមជួយចង្អុលបង្ហាញ និងផ្តល់កូដថ្មីដែលកែសម្រួលរួចមកឲ្យ។"

---

#### 🏋️ ៣. សុំឲ្យ AI ធ្វើជាគ្រូមកតេស្តសាកល្បងអ្នក (Practice Generation)
អ្នកអាចឲ្យ AI បង្កើតលំហាត់ខួរក្បាល ដើម្បីពង្រឹងសមត្ថភាពចាំ និងប្រើប្រាស់៖

> "ខ្ញុំចង់ហ្វឹកហាត់ប្រើប្រាស់រូបមន្ត SUMIFS។ 
> សន្មត់ថាអ្នកជាគ្រូ សូមបង្កើតជាសេណារីយ៉ូ (Scenario) អាជីវកម្មលក់ទូរស័ព្ទមួយដែលត្រូវរកបញ្チីចំណូល ហើយសួរជាសំណួរមកខ្ញុំឲ្យខ្ញុំគិតទាញរូបមន្តចេញមក។ (សួរម្តង ១ សំណួរបានហើយ!)
> បន្ទាប់មកចាំកែចម្លើយឲ្យខ្ញុំពេលខ្ញុំឆ្លើយរួច!"

---

#### 🚀 ៤. សុំមតិយោបល់ និងការកែលម្អ (Code Review)
បើអ្នកអាចរៀបរូបមន្ត ឬសរសេរកូដបានខ្លួនឯងហើយ តែមិនប្រាកដថាត្រឹមត្រូវល្អរឺនៅ អ្នកអាចឲ្យ AI ជួយត្រួតពិនិត្យ (Review) អោយបាន៖

> "ខាងក្រោមនេះជារូបមន្ត (ឬកូដ) ដែលខ្ញុំទើបតែសរសេរខ្លួនឯងដើម្បីទាញទិន្នន័យបុគ្គលិក។ សូមពិនិត្យមើលថាតើវាត្រឹមត្រូវ ឬដំណើរការលឿនហើយឬនៅ? បើក្នុងស្តង់ដារការងារអាជីព (Professional) តើគេគួរកែសម្រួលវាបែបណាឲ្យកាន់តែខ្លាំង និងខ្លី?"`
  },
  {
    id: "tutorial-prompt-form",
    titleKh: "១៥. សរសេរ Prompt បង្កើតកូដ Form ប្រមូលទិន្នន័យ",
    titleEn: "15. Generate HTML Forms using Prompts",
    descriptionKh: "រៀនសរសេរ Prompt បញ្ជាឲ្យ AI បង្កើតកូដ HTML Web App ដើម្បីប្រមូលទិន្នន័យពីអតិថិជន។",
    difficulty: "មធ្យម",
    duration: "៣០ នាទី",
    icon: "LayoutTemplate",
    youtubeId: "F1W2s62I-hM",
    tutorialContent: `### ប្រើ AI (ChatGPT/Gemini) អោយសរសេរកូដ Web App ទាំងមូល

អ្នកមិនចាំបាច់មានជំនាញសរសេរកូដ HTML ឬ JavaScript ពីសូន្យដោយខ្លួនឯងទេ! អ្នកអាចប្រាប់ AI អោយបង្កើតទម្រង់វ៉ិបសាយ (Web Form) មួយដែលអាចបញ្ជូនទិន្នន័យចូល Google Sheets បានទាំងស្រុង។

---

#### 🗣️ ក្បួនសរសេរ Prompt បញ្ជាអោយចេញកូដ
ដើម្បីអោយ AI សរសេរកូដបានត្រឹមត្រូវ ជាជាងការនិយាយប្រាប់ជាទូទៅថា "សរសេរ Web App អោយមួយមក" អ្នកត្រូវប្រាប់លម្អិតពីចំណុចទាំងឡាយដែលលោកអ្នកត្រូវការ៖

> 💡 "ខ្ញុំចង់ឲ្យអ្នកសរសេរកូដ \`Index.html\` និង \`Code.gs\` សម្រាប់ប្រព័ន្ធ **Google Apps Script** ដើម្បីបង្កើតជាប្រព័ន្ធចុះបញ្ជីទិន្នន័យ (Data Entry Web App)។
>
> **តម្រូវការផ្នែក UI (Index.html)៖**
> 1. Form ត្រូវមានប្រអប់បញ្ចូល (Input) ចំនួន ៣៖
>    - ឈ្មោះបុគ្គលិក (ចាំបាច់ត្រូវតែបំពេញ/Required)
>    - ទូរស័ព្ទ (ត្រូវតែចាប់ផ្តើមដោយលេខ 0 និងមាន 9 ទៅ 10 ខ្ទង់)
>    - ផ្នែកការងារ (ជា Dropdown រួមមាន៖ គណនេយ្យ, ទីផ្សារ, និង រដ្ឋបាល)
> 2. សូមរចនារូបរាងទម្រង់នេះឲ្យស្អាត ទាក់ទាញ មានរាងជ្រុងមូលៗបែបទំនើប (ប្រើ Tailwind CSS ក៏បាន ឬ CSS ធម្មតាក៏បានដោយពណ៌ខៀវខ្ចី) ស្ថិតនៅចំកណ្តាលពេញ។
> 3. ពេលមានអ្នកចុចប៊ូតុង \`បញ្ជូនទិន្នន័យ\` ត្រូវឲ្យប៊ូតុងនោះប្តូរពាក្យទៅជាកំពុងដំណើរការ រួចមានផ្ទាំង Alert ប្រាប់ថាទិន្នន័យបានបញ្ជូនជោគជ័យ។ ក្រោយលោតពីជោគជ័យ សូមលុបទិន្នន័យលើប្រអប់ចោលដើម្បីឲ្យគេវាយបញ្ចូលទិន្នន័យបន្ទាប់ទៀត។
>
> **តម្រូវការផ្នែក Server (Code.gs)៖**
> - មានលេខកូដអនុគមន៍ \`doGet()\` សម្រាប់បង្ហាញផ្ទាំង \`Index\`។
> - មានអនុគមន៍សម្រាប់រង់ចាំទទួល Data ពី Web រួចកត់ត្រាបញ្ចូលទៅក្នុងសន្លឹកកិច្ចការសកម្ម (Active Sheet) តាមជួរនីមួយៗ (Row) ។ 
> 
> *សូមផ្តល់កូដរៀបចំឲ្យស្អាត និងពេញលេញដើម្បីអាច Copy & Paste យកទៅប្រើបានតែម្តង!*"

---

#### 🔧 វិធីយកទៅប្រើប្រាស់យកមកតព្ចាប់
នៅពេល AI ទម្លាក់កូដមកអោយ៖
1. ចម្លងកូដរាប់រយបន្ទាត់សម្រាប់ផ្នែក \`Index.html\` យកទៅបិទភ្ជាប់ (Paste) ក្នុង file រួចរក្សាទុក (Save)។
2. ចម្លងកូដខាង Server \`Code.gs\` យកទៅ Paste ទម្លាក់ក្នុង file ផ្នែក Server។
3. ចុចប៊ូតុង **Deploy > New deployment > Web app** ជាការស្រេច! សូមសាកល្បងដោយខ្លួនអ្នក!`
  },
  {
    id: "tutorial-gmail-mailmerge",
    titleKh: "១៦. ស្វ័យប្រវត្តិកម្មផ្ញើ Gmail តៗគ្នា (Mail Merge)",
    titleEn: "16. Automated Mail Merge Settings",
    descriptionKh: "សរសេរ Code.gs បង្កើតការផ្ញើ Email រាប់រយស្វ័យប្រវត្តិ ជាមួយនឹងការបញ្ចូលឈ្មោះឲ្យត្រូវទៅនឹងទិន្នន័យក្នុង Sheets។",
    difficulty: "មធ្យម",
    duration: "៣៥ នាទី",
    icon: "Mail",
    youtubeId: "VVWxr7Hx9uA",
    tutorialContent: `### ការផ្ញើ Email រាប់រយស្វ័យប្រវត្តិបញ្ចូលឈ្មោះ (Mail Merge)

ក្នុងជីវិតការងារជាក់ស្តែង ពេលខ្លះយើងត្រូវផ្ញើអ៊ីមែល (Email) លិខិតអញ្ជើញ ឬវិក្កយបត្រ (Invoice) ទៅកាន់មនុស្ស ១០០ នាក់។ បើយើងអង្គុយផ្ញើម្តងមួយៗ វាចំណាយពេលច្រើនណាស់។ ថ្ងៃនេះយើងរៀនប្រើ Google Apps Script ដើម្បីផ្ញើវាម្តងទាំងអស់គ្នា ហើយឈ្មោះអ្នកទទួលប្តូរតាមអ៊ីមែលនីមួយៗទៀតផង!

**ជំហានទី១៖ រៀបចំតារាងទិន្នន័យ (Google Sheets)**
1. បង្កើត Sheet ថ្មីមួយ ដាក់លេខរៀងទី១ កូឡោន A ថា **"Email"** ឯកូឡោន B ថា **"Name"**។
2. បំពេញអ៊ីមែលពិតរបស់អ្នក ឬមិត្តភក្តិ ១-២ ជួរ ដើម្បីតេស្តសាកល្បង។

**ជំហានទី២៖ សុំកូដពី AI (Prompt)**
អ្នកអាចប្រើ AI (ChatGPT/Gemini) ដោយប្រាប់វាថា៖
> "ខ្ញុំមានទិន្នន័យអតិថិជនក្នុងសន្លឹកបច្ចុប្បន្ន។ កូឡោន A គឺ Email និងកូឡោន B គឺ Name។ សូមសរសេរ Apps Script ប្រើ \`MailApp.sendEmail\` ដើម្បីផ្ញើសារអញ្ជើញពួកគាត់។ សូមសរសេរពាក្យស្វាគមន៍ដោយភ្ជាប់ជាមួយឈ្មោះរបស់ពួកគាត់ផង។"

**ជំហានទី៣៖ កូដគំរូ Apps Script សម្រាប់ផ្ញើ Email៖**
អ្នកអាច Copy កូដនេះទៅដាក់ក្នុង **Extensions > Apps Script** ហើយចុច Run:
\`\`\`javascript
function sendEmails() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  // ទាញយកទិន្នន័យពីជួរទី២ ដល់ទី១០ (A2:B10)
  const data = sheet.getRange("A2:B10").getValues();

  data.forEach((row, index) => {
    const emailAddress = row[0]; // កូឡោន A
    const name = row[1];         // កូឡោន B
    
    // បញ្ជាក់ថាជួរហ្នឹងពិតជាមាន Email មែន
    if (emailAddress && emailAddress.includes("@")) {
      const subject = "ជម្រាបសួរលោក/លោកស្រី " + name;
      const message = "សូមស្វាគមន៍មកកាន់ប្រព័ន្ធស្វ័យប្រវត្តិថ្មីរបស់យើងខ្ញុំ! យើងសង្ឃឹមអ្នកនឹងពេញចិត្តសេវាកម្មនេះ។";
      
      MailApp.sendEmail(emailAddress, subject, message);
    }
  });
}
\`\`\`
*(ចំណាំ៖ នៅត្រង់ \`MailApp.sendEmail\` ជាលើកដំបូង Google នឹងឲ្យយើង Authorize សិទ្ធិ access ទៅក្នុង Gmail របស់អ្នក។)*`
  },
  {
    id: "tutorial-school-management",
    titleKh: "១៧. សរសេរ Prompt បង្កើតម៉ាអេមគ្រប់គ្រងសាលា",
    titleEn: "17. School Management System via AI",
    descriptionKh: "ប្រើប្រាស់ Prompt មួយកញ្ចប់ធំឲ្យ AI បង្កើតប្រព័ន្ធកត់ត្រាសិស្ស និងពិន្ទុ (Student Management System) ដោយមិនចាំបាច់សរសេរកូដ។",
    difficulty: "កម្រិតខ្ពស់",
    duration: "៤៥ នាទី",
    icon: "GraduationCap",
    youtubeId: "ArNu-Jr2MM8",
    tutorialContent: `### បង្កើតប្រព័ន្ធគ្រប់គ្រងសាលារៀន (School Management System) លក្ខណៈកម្រិតខ្ពស់

Google Sheets អាចត្រូវបានប្រែក្លាយទៅជាប្រព័ន្ធគ្រប់គ្រងដ៏ធំមួយ បើយើងចុះសម្រុងគ្នាជាមួយ Apps Script និងការប្រើប្រាស់រូបមន្ត (Formulas) ផ្សេងៗ។

**គន្លឹះសំខាន់ៗសម្រាប់ធ្វើប្រព័ន្ធធំៗ៖**
* **កុំសួរ AI លេបតែម្តង!** បើអ្នកប្រាប់ AI "សរសេរប្រព័ន្ធសាលាមួយអោយខ្ញុំ" វានឹងចេញមកទូទៅ ច្របូកច្របល់។
* **យុទ្ធសាស្រ្ត៖** យើងត្រូវចែកចេញជា៣ផ្នែក (៣ Prompts ម្តងមួយៗ)៖

**ផ្នែកទី១៖ បង្កើតរចនាសម្ព័ន្ធ (Database Structure)**
> 💡 *Prompt ទៅ AI:* "ខ្ញុំចង់បង្កើតប្រព័ន្ធគ្រប់គ្រងសិស្ស។ តើខ្ញុំគួរមាន Sheets ប៉ុន្មាន (ឧទាហរណ៍ Students, Attendance, Grades) ហើយក្នុង Sheet នីមួយៗគួរមានកូឡោន (Columns) អ្វីខ្លះដើម្បីងាយស្រួលគ្រប់គ្រង?"
> 💬 *អនុវត្ត:* រៀបចំ Google Sheets តាមអ្វីដែល AI ប្រាប់សិន ចាំបន្តទៅជំហានទី២។

**ផ្នែកទី២៖ សុំកូដ Web App សម្រាប់បញ្ចូលទិន្នន័យ (Data Entry UI)**
> 💡 *Prompt ទៅ AI:* "ឥឡូវសូមសរសេរ Web App HTML ភ្ជាប់ជាមួយ Code.gs សំរាប់បញ្ចូលអវត្តមានសិស្ស ចូលទៅក្នុង Sheet 'Attendance'។ សូមអោយមានប្រអប់រើសថ្ងៃខែ (Date Picker) និងឈ្មោះសិស្ស។"

**ផ្នែកទី៣៖ បង្កើត Dashboard (ទាញយកទិន្នន័យ)**
> 💡 *Prompt ទៅ AI:* "តើខ្ញុំអាចប្រើរូបមន្តអ្វីខ្លះ (ដូចជា \`QUERY\`, \`VLOOKUP\`, \`SUMIFS\`) ដើម្បីបង្ហាញចំនួនការអវត្តមានសរុបរបស់សិស្សម្នាក់ៗ នៅលើ Dashboard Sheet?"

**អត្ថប្រយោជន៍:** ការបំបែកជាជំហាននេះជួយអោយអ្នកជា "វិស្វករប្រព័ន្ធ" ឯ AI គ្រាន់តែជាអ្នកស៊ីឈ្នួលសរសេរកូដឲ្យអ្នក។ លទ្ធផលនឹងមានភាពជាក់លាក់ និងប្រើបានពិតៗ១០០%។`
  },
  {
    id: "tutorial-pdf-invoice",
    titleKh: "១៨. ស្វ័យប្រវត្តិកម្មបោះពុម្ភ Invoice PDF",
    titleEn: "18. Auto PDF Generate & Send Email",
    descriptionKh: "ទាញទិន្នន័យពី Sheet ជួរនីមួយៗ យកទៅចាក់ចូល Google Docs បម្លែងជា PDF ហើយ Email ទៅអតិថិជន។",
    difficulty: "កម្រិតខ្ពស់",
    duration: "៥៥ នាទី",
    icon: "FileText",
    youtubeId: "J2X5m0cM000",
    tutorialContent: `### បង្កើត Invoice ទាញចូល PDF ហើយផ្ញើអ៊ីមែលស្វ័យប្រវត្តិ

នេះគឺជាជំនាញមួយដែលមានតម្លៃខ្លាំងបំផុតសម្រាប់ផ្នែកគណនេយ្យ គឺការទាញទិន្នន័យពី Sheet ទៅបង្កើតជាក្រដាសវិក្កយបត្រ (Invoice) ជាប្រភេទ PDF។

**វត្ថុធាតុដើមដែលអ្នកត្រូវការ៖**
1. **Google Sheets:** ផ្ទុកទិន្នន័យ (ឈ្មោះ, ប្រាក់, កាលបរិច្ឆេទ)។
2. **Google Docs (Template):** ជាសន្លឹកវិក្កយបត្រដែលបានរចនាស្អាតបាត។ អ្នកត្រូវដាក់អក្សរតំណាង (Variables) ដូចជា \`{{Name}}\`, \`{{Amount}}\`, \`{{Date}}\` នៅកន្លែងដែលត្រូវប្តូរឈ្មោះ។

**របៀបប្រើ AI ដើម្បីបង្កើតកូដ PDF Invoice ច្បាស់លាស់៖**
សូម Copy ការអធិប្បាយនេះប្រាប់ទៅកាន់ AI (ChatGPT/Gemini):
> 💡 "ខ្ញុំមានតារាងទិន្នន័យអតិថិជនក្នុងសន្លឹក 'InvoiceData' ដែលមានកូឡោន: Name, Amount, Email, Status។ 
> ខ្ញុំមាន Google Doc មួយទៀតទុកធ្វើជា Template (ID: [សូមដាក់ ID របស់ Doc អ្នកទីនេះ]) ដែលក្នុងនោះយើងបានដាក់អក្សរ {{Name}} និង {{Amount}}។ 
> សូមសរសេរកូដ Google Apps Script ដែល៖
> 1. រត់ (Loop) ទាញទិន្នន័យពី Sheet 'InvoiceData' ជួរណាដែល Status នៅទទេ (មិនទាន់បាន Issue)
> 2. បង្កើត Copy ថ្មីចេញពី Template Doc នោះ បន្ទាប់មក Replace ពាក្យ {{Name}} ជាមួយនឹងទិន្នន័យពិតក្នុង Sheet
> 3. បម្លែង Doc នោះទៅជា PDF រួចផ្ញើអ៊ីមែលទៅអតិថិជន (ដោយប្រើយក Email ពីកូឡោន C)
> 4. នៅពេលជោគជ័យ សូមលុប Doc ដែលបាន Copy ចោល (រក្សាទុកតែ PDF កុំឲ្យពេញ Drive) និងបញ្ជាក់ស្ថានភាពក្នុង Sheet ថា 'Issued'"

**ហេតុអ្វីបានជា Prompt នេះខ្លាំង?**
ដោយសារវាបានបញ្ជាក់ច្បាស់នូវ Business Logic (ដូចជាការលុប Doc បណ្តោះអាសន្នចោល និងមានការដាក់ Status ថា Issued) ដែលធ្វើឲ្យកូដដែលបានមកមានលក្ខណៈដូចការងារអាជីព (Professional Script)។`
  },
  {
    id: "tutorial-api-fetch",
    titleKh: "១៩. ទាញទិន្នន័យពី API ក្រៅប្រទេស",
    titleEn: "19. Fetching External APIs via Code.gs",
    descriptionKh: "ប្រើ UrlFetchApp អូសទិន្នន័យអត្រាប្តូរប្រាក់ (Exchange Rate) ឬអាកាសធាតុ ចូលទៅក្នុង Google Sheets ស្វ័យប្រវត្តិរៀងរាល់ម៉ោង។",
    difficulty: "កម្រិតខ្ពស់",
    duration: "៣០ នាទី",
    icon: "Globe",
    youtubeId: "RK9mfuFgm54",
    tutorialContent: `### ទាញទិន្នន័យពី API ក្រៅប្រទេសចូលមកក្នុង Google Sheet

បើអ្នកចង់ទាញយក អត្រាប្តូរប្រាក់ប្រចាំថ្ងៃ, ឬការព្យាករណ៍អាកាសធាតុ, ឬទិន្នន័យភាគហ៊ុន ចូលមក Google Sheets អ្នកមិនចាំបាច់វាយបញ្ចូលដោយដៃជារៀងរាល់ថ្ងៃទេ។ យើងអាចប្រើប្រាស់ \`UrlFetchApp\` ដើម្បីអូសពីប្រភព (API) ដោយផ្ទាល់!

**តើ API ជាអ្វី?**
API គឺជាកន្លែងផ្តល់ទិន្នន័យ (ជាទម្រង់ JSON) ពីកម្មវិធីមួយទៅកម្មវិធីមួយទៀត។ ឧទាហរណ៍ ធនាគារកណ្តាល អាចមានទិន្នន័យអត្រាប្តូរប្រាក់នៅ Web Address ណាមួយ។

**កូដគំរូទាញអត្រាប្តូរប្រាក់ (Exchange Rate API)៖**
\`\`\`javascript
function fetchExchangeRate() {
  // ប្រភព URL ឥតគិតថ្លៃសម្រាប់អត្រាប្តូរប្រាក់ពី USD ទៅរូបិយប័ណ្ណផ្សេងៗ
  const url = "https://api.exchangerate-api.com/v4/latest/USD";
  
  // ធ្វើការចាប់ទិន្នន័យពី URL (Get Request)
  const response = UrlFetchApp.fetch(url);
  
  // បំប្លែងទិន្នន័យដែលចាប់បាន (Text) អោយទៅជា Object (JSON)
  const data = JSON.parse(response.getContentText());
  
  // ទាញយកប្រាក់រៀលខ្មែរ (KHR) ចេញពីទិន្នន័យសរុប (Rates)
  const khmRate = data.rates["KHR"];
  
  // បញ្ចូលវាក្នុងក្រឡា A1
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.getRange("A1").setValue("អត្រាថ្ងៃនេះ៖ 1 USD = " + khmRate + " ៛");
}
\`\`\`

**គន្លឹះពិសេស៖ ការដាក់ម៉ោងឲ្យដើរដោយស្វ័យប្រវត្តិ (Time-Driven Trigger)**
អ្នកមិនបាច់ចូលមកចុច Run ជាប្រចាំទេ។ ចូលទៅកាន់ **Triggers (រូបនាឡិកាក្នុង Apps Script)** រួចកំណត់ថា៖
* ជ្រើសរើសអនុគមន៍: \`fetchExchangeRate\`
* ប្រភេទដំណើរការ: \`Time-driven\`
* Time based: \`Day timer\` ម៉ោង 8am to 9am
(នោះវានឹង Update អត្រាប្រាក់ជារៀងរាល់ម៉ោង ៨ ព្រឹកជានិច្ច)។`
  },
  {
    id: "tutorial-inventory-supabase",
    titleKh: "២០. ប្រព័ន្ធស្តុកធំៗ (Supabase + AI + Sheets)",
    titleEn: "20. Enterprise Inventory with Supabase App",
    descriptionKh: "ការតភ្ជាប់កម្រិតខ្ពស់បំផុត គ្រប់គ្រងស្តុកតាមការអភិវឌ្ឍប្រើប្រាស់ Database ពិត (Supabase) ជាមួយចំណុចប្រទាក់ Web App។",
    difficulty: "កម្រិតខ្ពស់",
    duration: "៦០ នាទី",
    icon: "Boxes",
    youtubeId: "xv8RXzUMTng",
    tutorialContent: `### ប្រព័ន្ធស្តុកធំៗលំដាប់ក្រុមហ៊ុន (Supabase + Google Sheets)

Google Sheets ដាក់ទិន្នន័យបានត្រឹមរាប់ពាន់ ឬម៉ឺនជួរ វានឹងចាប់ផ្តើមដើរយឺតខ្លាំង។ ពេលអ្នកមានទិន្នន័យធំមហិមា (Big Data) ដូចជាទិន្នន័យស្តុករាប់លាន ឬទិន្នន័យលក់រាល់ថ្ងៃ... ដល់ពេលដែលយើងត្រូវប្រើយុទ្ធសាស្ត្រលំដាប់សហគ្រាស (Enterprise Tier) មានន័យថា៖

👉 **ប្រើ Google Sheets ត្រឹមជាផ្ទាំងមើល (Front-End Dashboard)**
👉 **ប្រើ Supabase ទុកជាឃ្លាំងផ្ទុកទិន្នន័យពិតប្រាកដ (Back-End Database)**

**តើអ្វីទៅជា Supabase?**
វាជាសេវាកម្ម Database ដែលផ្តល់នូវ PostgreSQL (ប្រព័ន្ធផ្ទុកទិន្នន័យខ្លាំងបំផុតមួយ) ដោយឥតគិតថ្លៃសម្រាប់គម្រោងតូចតាច និងងាយស្រួលសរសេរកូដភ្ជាប់ទៅវិញទៅមក (API)។

**របៀបសុំ AI ជួយបង្កើតប្រព័ន្ធតភ្ជាប់នេះ (Prompt)៖**
> 💡 "ខ្ញុំចង់ផ្ទេរការផ្ទុកទិន្នន័យពី Google Sheets ទៅកាន់ Supabase PostgreSQL Database វិញ តែខ្ញុំនៅប្រើ Google Sheets ជាផ្ទាំងបង្ហាញ (Dashboard) ដដែល។
> សូមជួយ:
> 1. ប្រាប់ខ្ញុំពីរបៀបបង្កើត Table 'products' នៅក្នុងសេវាកម្ម Supabase។
> 2. សរសេរកូដ Google Apps Script (\`UrlFetchApp.fetch\`) សម្រាប់ទាញយក (GET Request) ទិន្នន័យស្តុកទាំងអស់ពី Supabase រួចយកមកដាក់បញ្ហាញក្នុង Sheet 'Inventory'។ 
> 3. សូមរួមបញ្ចូលរបៀបដាក់ Authorization Header ជាមួយ Anon Key និង Supabase URL តែម្តង។"

**អ្វីដែលអ្នកទទួលបាន៖**
ពេលនោះអ្នកនឹងរៀនពីរបៀបធ្វើ Web Access ផ្លូវការ លក្ខណៈសន្តិសុខទូទៅ និងបច្ចេកទេសដែល Developer ពិតប្រាកដប្រើជារៀងរាល់ថ្ងៃ! អ្នកបានបោះជំហានពីអ្នកប្រើ Excel ធម្មតា ក្លាយជា Software Engineer ផ្នែក Data មួយរូបហើយ!`
  },
  {
    id: "practice-sparkline",
    titleKh: "ការសង់ក្រាប និងវិភាគទិន្នន័យ (SPARKLINE)",
    titleEn: "Sparkline & Data Analysis",
    descriptionKh: "អនុវត្តការប្រើប្រាស់រូបមន្ត SPARKLINE ដើម្បីសង់ក្រាបខ្នាតតូចក្នុងក្រឡា ដើម្បីវិភាគទិន្នន័យចំណូល។ ឧទាហរណ៍៖ =SPARKLINE(C2:C6,{\"charttype\",\"column\"})",
    difficulty: "កម្រិតខ្ពស់",
    duration: "១០ នាទី",
    icon: "BarChart"
  },
  {
    id: "practice-payroll",
    titleKh: "ការរៀបបញ្ជីប្រាក់ខែ (IF)",
    titleEn: "Payroll using IF",
    descriptionKh: "អនុវត្តការប្រើប្រាស់រូបមន្ត IF ដើម្បីកំណត់ប្រាក់រង្វាន់ (Bonus) ផ្អែកលើប្រាក់ខែគោល។ ឧទាហរណ៍៖ =IF(C2<400, 50, 0)",
    difficulty: "ងាយស្រួល",
    duration: "១០ នាទី",
    icon: "Calculator"
  },
  {
    id: "practice-attendance",
    titleKh: "ការរៀបបញ្ជីវត្តមាន (COUNTIF)",
    titleEn: "Attendance using COUNTIF",
    descriptionKh: "អនុវត្តការប្រើប្រាស់រូបមន្ត COUNTIF សម្រាប់រាប់អវត្តមាន ឬវត្តមានរបស់បុគ្គលិកប្រចាំសប្តាហ៍។ ឧទាហរណ៍៖ =COUNTIF(C5:G5, \"P\")",
    difficulty: "ងាយស្រួល",
    duration: "១០ នាទី",
    icon: "Calendar"
  },
  {
    id: "practice-filter-absent",
    titleKh: "ការស្វែងរកអ្នកឈប់ (FILTER)",
    titleEn: "Filter Absent Employees",
    descriptionKh: "អនុវត្តប្រើប្រាស់រូបមន្ត FILTER ដើម្បីទាញយកតែបុគ្គលិកដែលអវត្តមានចេញពីតារាងរួម។ ឧទាហរណ៍៖ =FILTER(A2:A5, C2:C5=\"A\")",
    difficulty: "មធ្យម",
    duration: "១០ នាទី",
    icon: "Filter"
  },
  {
    id: "practice-age-group",
    titleKh: "ការស្វែងរកក្រុមអាយុ (IFS)",
    titleEn: "Age Group using IFS",
    descriptionKh: "អនុវត្តប្រើប្រាស់រូបមន្ត IFS ដើម្បីបែងចែកក្រុមអាយុបុគ្គលិក (ក្មេង, យុវជន, ចាស់) តាមលក្ខខណ្ឌច្រើន។ ឧទាហរណ៍៖ =IFS(C2<20, \"ក្មេង\", C2<30, \"យុវជន\", TRUE, \"ចាស់\")",
    difficulty: "មធ្យម",
    duration: "១៥ នាទី",
    icon: "Users"
  }
];

export const formulaQuests: FormulaQuest[] = [
  {
    id: "quest-1",
    titleKh: "1. បូកសរុប (SUM)",
    descriptionKh: "បូកសរុបប្រាក់ខែបុគ្គលិកទាំងអស់ក្នុងជួរ C ពី C2 ដល់ C6។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=SUM(C2:C6)","=sum(c2:c6)"],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =SUM(C2:C6)"
  },
  {
    id: "quest-2",
    titleKh: "2. មធ្យមភាគ (AVERAGE)",
    descriptionKh: "រកមធ្យមភាគប្រាក់ខែពី C2 ដល់ C6។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=AVERAGE(C2:C6)","=average(c2:c6)"],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =AVERAGE(C2:C6)"
  },
  {
    id: "quest-3",
    titleKh: "3. តម្លៃធំបំផុត (MAX)",
    descriptionKh: "រកប្រាក់ខែដែលខ្ពស់បំផុតពី C2 ដល់ C6។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=MAX(C2:C6)","=max(c2:c6)"],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =MAX(C2:C6)"
  },
  {
    id: "quest-4",
    titleKh: "4. តម្លៃតូចបំផុត (MIN)",
    descriptionKh: "រកប្រាក់ខែដែលទាបបំផុតពី C2 ដល់ C6។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=MIN(C2:C6)","=min(c2:c6)"],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =MIN(C2:C6)"
  },
  {
    id: "quest-5",
    titleKh: "5. រាប់ចំនួនលេខ (COUNT)",
    descriptionKh: "រាប់ចំនួនក្រឡាដែលមានលេខក្នុងជួរ C2 ដល់ C6។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=COUNT(C2:C6)","=count(c2:c6)"],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =COUNT(C2:C6)"
  },
  {
    id: "quest-6",
    titleKh: "6. រាប់ចំនួនអត្ថបទនិងលេខ (COUNTA)",
    descriptionKh: "រាប់ចំនួនក្រឡាដែលមានទិន្នន័យ (មិនទទេ) ក្នុងជួរ B2 ដល់ B6។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=COUNTA(B2:B6)","=counta(b2:b6)"],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =COUNTA(B2:B6)"
  },
  {
    id: "quest-7",
    titleKh: "7. លក្ខខណ្ឌសាមញ្ញ (IF)",
    descriptionKh: "ប្រសិនបើប្រាក់ខែ C2 ធំជាងឬស្មើ 500 បង្ហាញពាក្យ \"ខ្ពស់\" បើមិនពិតបង្ហាញពាក្យ \"ធម្មតា\"។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=IF(C2>=500,\"ខ្ពស់\",\"ធម្មតា\")","=if(c2>=500,\"ខ្ពស់\",\"ធម្មតា\")","=IF(C2>=500, \"ខ្ពស់\", \"ធម្មតា\")"],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =IF(C2>=500,\"ខ្ពស់\",\"ធម្មតា\")"
  },
  {
    id: "quest-8",
    titleKh: "8. រាប់តាមលក្ខខណ្ឌ (COUNTIF)",
    descriptionKh: "រាប់ចំនួនបុគ្គលិកដែលមានផ្នែកជា \"រដ្ឋបាល\" ក្នុងជួរ B2 ដល់ B6។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=COUNTIF(B2:B6,\"រដ្ឋបាល\")","=countif(b2:b6,\"រដ្ឋបាល\")"],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =COUNTIF(B2:B6,\"រដ្ឋបាល\")"
  },
  {
    id: "quest-9",
    titleKh: "9. បូកតាមលក្ខខណ្ឌ (SUMIF)",
    descriptionKh: "បូកសរុបប្រាក់ខែតែផ្នែក \"រដ្ឋបាល\" (លក្ខខណ្ឌ B2:B6, បូក C2:C6)។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=SUMIF(B2:B6,\"រដ្ឋបាល\",C2:C6)","=sumif(b2:b6,\"រដ្ឋបាល\",c2:c6)"],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =SUMIF(B2:B6,\"រដ្ឋបាល\",C2:C6)"
  },
  {
    id: "quest-10",
    titleKh: "10. ស្វែងរកទិន្នន័យបញ្ឈរ (VLOOKUP)",
    descriptionKh: "ស្វែងរកប្រាក់ខែរបស់ \"សុខ ជា\" ដោយប្រើឈ្មោះជាអត្តសញ្ញាណ ក្នុងតារាង A2:C6 ជួរឈរទី 3 (Exact match)។ ឧបមាថាយើងយកឈ្មោះ \"សុខ ជា\"។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=VLOOKUP(\"សុខ ជា\",A2:C6,3,FALSE)","=vlookup(\"សុខ ជា\",a2:c6,3,false)","=VLOOKUP(\"សុខ ជា\",A2:C6,3,0)"],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =VLOOKUP(\"សុខ ជា\",A2:C6,3,FALSE)"
  },
  {
    id: "quest-11",
    titleKh: "11. ភ្ជាប់អត្ថបទ (CONCATENATE)",
    descriptionKh: "ភ្ជាប់ឈ្មោះ \"សុខ\" (A2) និង \"ជា\" (B2) បញ្ចូលគ្នាឲ្យមានដកឃ្លាចំកណ្តាល។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=CONCATENATE(A2,\" \",B2)","=concatenate(a2,\" \",b2)","=A2&\" \"&B2","=a2&\" \"&b2"],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =CONCATENATE(A2,\" \",B2) ឬ =A2&\" \"&B2"
  },
  {
    id: "quest-12",
    titleKh: "12. កាត់យកអក្សរពីឆ្វេង (LEFT)",
    descriptionKh: "យក ២តួអក្សរដំបូងនៃ \"កម្ពុជា\" ពីក្រឡា A2។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=LEFT(A2,2)","=left(a2,2)"],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =LEFT(A2,2)"
  },
  {
    id: "quest-13",
    titleKh: "13. កាត់យកអក្សរពីស្តាំ (RIGHT)",
    descriptionKh: "យក ២តួអក្សរចុងក្រោយពីក្រឡា A2។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=RIGHT(A2,2)","=right(a2,2)"],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =RIGHT(A2,2)"
  },
  {
    id: "quest-14",
    titleKh: "14. កាត់យកអក្សរកណ្តាល (MID)",
    descriptionKh: "យក ៣តួអក្សរចាប់ពីតួទី ២ នៃក្រឡា A2។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=MID(A2,2,3)","=mid(a2,2,3)"],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =MID(A2,2,3)"
  },
  {
    id: "quest-15",
    titleKh: "15. រាប់ចំនួនតួអក្សរ (LEN)",
    descriptionKh: "រាប់ចំនួនតួអក្សរក្នុងឈ្មោះ (ក្រឡា B2)។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=LEN(B2)","=len(b2)"],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =LEN(B2)"
  },
  {
    id: "quest-16",
    titleKh: "16. លុបចន្លោះដកឃ្លាដែលលើស (TRIM)",
    descriptionKh: "លុបការដកឃ្លាដែលមិនចាំបាច់ចេញពីឈ្មោះក្នុង (ក្រឡា B2)។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=TRIM(B2)","=trim(b2)"],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =TRIM(B2)"
  },
  {
    id: "quest-17",
    titleKh: "17. ប្តូរអក្សរតូចជាអក្សរធំ (UPPER)",
    descriptionKh: "ប្តូរអក្សរអង់គ្លេសក្នុងក្រឡា B2 ទៅជាដុំធំ (Capital Letters)។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=UPPER(B2)","=upper(b2)"],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =UPPER(B2)"
  },
  {
    id: "quest-18",
    titleKh: "18. ប្តូរអក្សរធំជាអក្សរតូច (LOWER)",
    descriptionKh: "ប្តូរអក្សរក្នុងក្រឡា B2 ទៅជាអក្សរតូច។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=LOWER(B2)","=lower(b2)"],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =LOWER(B2)"
  },
  {
    id: "quest-19",
    titleKh: "19. ប្តូរតួអក្សរដើមធំ (PROPER)",
    descriptionKh: "ប្តូរតួអក្សរទីមួយនៃពាក្យក្នុង B2 ទៅជាអក្សរធំ។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=PROPER(B2)","=proper(b2)"],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =PROPER(B2)"
  },
  {
    id: "quest-20",
    titleKh: "20. ថ្ងៃខែឆ្នាំបច្ចុប្បន្ន (TODAY)",
    descriptionKh: "បង្ហាញកាលបរិច្ឆេទថ្ងៃនេះក្នុង Sheet។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=TODAY()","=today()"],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =TODAY()"
  },
  {
    id: "quest-21",
    titleKh: "21. ម៉ោងនិងថ្ងៃខែ (NOW)",
    descriptionKh: "បង្ហាញកាលបរិច្ឆេទនិងម៉ោងបច្ចុប្បន្ន។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=NOW()","=now()"],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =NOW()"
  },
  {
    id: "quest-22",
    titleKh: "22. លាក់កំហុសរូបមន្ត (IFERROR)",
    descriptionKh: "បើសិនការស្វែងរកខុសឆ្គង (Error) ឲ្យបង្ហាញពាក្យ \"គ្មាន\" ជាការជំនួស (អនុវត្តជាមួយ A2)។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=IFERROR(A2,\"គ្មាន\")","=iferror(a2,\"គ្មាន\")"],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =IFERROR(A2,\"គ្មាន\")"
  },
  {
    id: "quest-23",
    titleKh: "23. បូកមានលក្ខខណ្ឌច្រើន (SUMIFS)",
    descriptionKh: "បូកប្រាក់ខែ (C2:C6) សម្រាប់តែផ្នែក \"រដ្ឋបាល\" (B2:B6) និងប្រាក់ខែធំជាង 300។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=SUMIFS(C2:C6,B2:B6,\"រដ្ឋបាល\",C2:C6,\">300\")","=sumifs(c2:c6,b2:b6,\"រដ្ឋបាល\",c2:c6,\">300\")"],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =SUMIFS(C2:C6,B2:B6,\"រដ្ឋបាល\",C2:C6,\">300\")"
  },
  {
    id: "quest-24",
    titleKh: "24. រាប់មានលក្ខខណ្ឌច្រើន (COUNTIFS)",
    descriptionKh: "រាប់បុគ្គលិក \"រដ្ឋបាល\" (B2:B6) ដែលមានមុខតំណែង \"មន្ត្រីការិយាល័យ\" (D2:D6)។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=COUNTIFS(B2:B6,\"រដ្ឋបាល\",D2:D6,\"មន្ត្រីការិយាល័យ\")","=countifs(b2:b6,\"រដ្ឋបាល\",d2:d6,\"មន្ត្រីការិយាល័យ\")"],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =COUNTIFS(B2:B6,\"រដ្ឋបាល\",D2:D6,\"មន្ត្រីការិយាល័យ\")"
  },
  {
    id: "quest-25",
    titleKh: "25. ទាញយកទិន្នន័យ (INDEX)",
    descriptionKh: "យកទិន្នន័យនៅជួរទី 2 កូឡោនទី 3 ពីតារាង A2:C6។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=INDEX(A2:C6,2,3)","=index(a2:c6,2,3)"],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =INDEX(A2:C6,2,3)"
  },
  {
    id: "quest-26",
    titleKh: "26. រកចន្លោះរៀង (MATCH)",
    descriptionKh: "ស្វែងរកទីតាំងរៀងនៃពាក្យ \"សុខ ជា\" ក្នុងជួរឈរ B2:B6 (Exact match)។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=MATCH(\"សុខ ជា\",B2:B6,0)","=match(\"សុខ ជា\",b2:b6,0)"],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =MATCH(\"សុខ ជា\",B2:B6,0)"
  },
  {
    id: "quest-27",
    titleKh: "27. INDEX រួម MATCH",
    descriptionKh: "ទាញយកប្រាក់ខែយោងមុខតំណែង។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=INDEX(C2:C6,MATCH(\"សុខ ជា\",B2:B6,0))","=index(c2:c6,match(\"សុខ ជា\",b2:b6,0))"],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =INDEX(C2:C6,MATCH(\"សុខ ជា\",B2:B6,0))"
  },
  {
    id: "quest-28",
    titleKh: "28. ទាញយកតម្លៃមិនជាន់គ្នា (UNIQUE)",
    descriptionKh: "ដកស្រង់តែឈ្មោះផ្នែកដែលមិនជាន់គ្នាពីជួរ B2:B6។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=UNIQUE(B2:B6)","=unique(b2:b6)"],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =UNIQUE(B2:B6)"
  },
  {
    id: "quest-29",
    titleKh: "29. តម្រៀបទិន្នន័យ (SORT)",
    descriptionKh: "តម្រៀបទិន្នន័យពី B2:B6 តាមអក្ខរក្រមពី ក-អ។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=SORT(B2:B6)","=sort(b2:b6)"],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =SORT(B2:B6)"
  },
  {
    id: "quest-30",
    titleKh: "30. ត្រងទិន្នន័យ (FILTER)",
    descriptionKh: "ត្រងយកតែបុគ្គលិកដែលមានប្រាក់ខែលើស 400 (ទីតាំងឈ្មោះ A2:A6, ទីតាំងប្រាក់ខែ C2:C6)។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=FILTER(A2:A6,C2:C6>400)","=filter(a2:a6,c2:c6>400)","=FILTER(A2:A6, C2:C6>400)"],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =FILTER(A2:A6,C2:C6>400)"
  },
  {
    id: "quest-31",
    titleKh: "31. លោតរំកិលក្រឡា (OFFSET)",
    descriptionKh: "ចាប់ផ្តើមពី A2 រួចរំកិលចុះក្រោម ១ ជួរ និងទៅស្តាំ ២ ជួរឈរ។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=OFFSET(A2,1,2)","=offset(a2,1,2)"],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =OFFSET(A2,1,2)"
  },
  {
    id: "quest-32",
    titleKh: "32. បម្លែងអត្ថបទទៅជាក្រឡា (INDIRECT)",
    descriptionKh: "ទាញយកទិន្នន័យពីក្រឡា C4 ដោយការផ្សំអក្សរ \"C\" និងលេខ 4។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=INDIRECT(\"C\"&4)","=indirect(\"c\"&4)","=INDIRECT(\"C4\")","=indirect(\"c4\")"],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =INDIRECT(\"C\"&4)"
  },
  {
    id: "quest-33",
    titleKh: "33. ស្វែងរកទំនើប (XLOOKUP)",
    descriptionKh: "ប្រើ XLOOKUP ស្វែងរក \"កែវ មុនី\" ក្នុងជួរ A2:A6 រួចទាញយកផ្នែកការងារពីជួរ B2:B6។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=XLOOKUP(\"កែវ មុនី\",A2:A6,B2:B6)","=xlookup(\"កែវ មុនី\",a2:a6,b2:b6)","=XLOOKUP(\"កែវ មុនី\", A2:A6, B2:B6)"],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =XLOOKUP(\"កែវ មុនី\",A2:A6,B2:B6)"
  },
  {
    id: "quest-34",
    titleKh: "34. រកទីតាំងនៃតម្លៃធំបំផុត (MATCH MAX)",
    descriptionKh: "រកទីតាំងរៀងនៃបុគ្គលិកដែលមានប្រាក់ខែខ្ពស់បំផុតក្នុងជួរ C2:C6 ដោយប្រើ MAX រួមបញ្ចូលជាមួយ MATCH។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=MATCH(MAX(C2:C6),C2:C6,0)","=match(max(c2:c6),c2:c6,0)"],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =MATCH(MAX(C2:C6),C2:C6,0)"
  },
  {
    id: "quest-35",
    titleKh: "35. ទាញយកឈ្មោះប្រាក់ខែខ្ពស់ (INDEX-MATCH MAX)",
    descriptionKh: "ទាញយកឈ្មោះបុគ្គលិក(A2:A6) ដែលមានប្រាក់ខែខ្ពស់ជាងគេដោយប្រើ MAX ក្នុងឯកសារនេះ។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=INDEX(A2:A6,MATCH(MAX(C2:C6),C2:C6,0))","=index(a2:a6,match(max(c2:c6),c2:c6,0))"],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =INDEX(A2:A6,MATCH(MAX(C2:C6),C2:C6,0))"
  },
  {
    id: "quest-36",
    titleKh: "36. ពិនិត្យក្រឡាទទេ (ISBLANK)",
    descriptionKh: "ពិនិត្យមើលថាតើក្រឡាប្រាក់ខែ C2 ជាក្រឡាទទេ (Blank) ដែរឬទេ។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=ISBLANK(C2)","=isblank(c2)"],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =ISBLANK(C2)"
  },
  {
    id: "quest-37",
    titleKh: "37. បម្លែងទម្រង់លេខ (TEXT)",
    descriptionKh: "បម្លែងប្រាក់ខែ C2 ទៅជាអត្ថបទដែលមានទម្រង់សញ្ញាដុល្លារ និងក្បៀស \"$#,##0.00\"។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=TEXT(C2,\"$#,##0.00\")","=text(c2,\"$#,##0.00\")"],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =TEXT(C2,\"$#,##0.00\")"
  },
  {
    id: "quest-38",
    titleKh: "38. បំបែកអត្ថបទ (SPLIT)",
    descriptionKh: "បំបែកឈ្មោះ \"សុខ ជា\" (A2) ទៅជាពីរក្រឡាដោយប្រើសញ្ញាដកឃ្លា។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=SPLIT(A2,\" \")","=split(a2,\" \")"],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =SPLIT(A2,\" \")"
  },
  {
    id: "quest-39",
    titleKh: "39. ស្វែងរកទីតាំងនវានុវត្តន៍ (XMATCH)",
    descriptionKh: "ស្វែងរកទីតាំងជួរដេករបស់ \"ម៉ៅ វិបុល\" ក្នុង A2:A6 ដោយប្រើ XMATCH។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=XMATCH(\"ម៉ៅ វិបុល\",A2:A6)","=xmatch(\"ម៉ៅ វិបុល\",a2:a6)"],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =XMATCH(\"ម៉ៅ វិបុល\",A2:A6)"
  },
  {
    id: "quest-40",
    titleKh: "40. ចម្រោះទិន្នន័យឆ្លាតវៃ (QUERY)",
    descriptionKh: "ប្រើ QUERY ទាញយកតែកូឡោន A (ឈ្មោះ) និង C (ប្រាក់ខែ) ពីតារាង A1:C6 សម្រាប់តែប្រាក់ខែ > 400។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=QUERY(A1:C6,\"SELECT A, C WHERE C > 400\")","=query(a1:c6,\"select a, c where c > 400\")","=QUERY(A1:C6, \"SELECT A, C WHERE C > 400\")"],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =QUERY(A1:C6,\"SELECT A, C WHERE C > 400\")",
  }
,
{
    id: "quest-41",
    titleKh: "41. មធ្យមភាគតាមលក្ខខណ្ឌ (AVERAGEIF)",
    descriptionKh: "រកមធ្យមភាគប្រាក់ខែសម្រាប់តែបុគ្គលិកផ្នែក 'រដ្ឋបាល' ប៉ុណ្ណោះ។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ['=AVERAGEIF(B2:B6,"រដ្ឋបាល",C2:C6)','=averageif(b2:b6,"រដ្ឋបាល",c2:c6)','=AVERAGEIF(B2:B6, "រដ្ឋបាល", C2:C6)'],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =AVERAGEIF(B2:B6,\"រដ្ឋបាល\",C2:C6)"
  },
  {
    id: "quest-42",
    titleKh: "42. មធ្យមភាគលក្ខខណ្ឌច្រើន (AVERAGEIFS)",
    descriptionKh: "រកមធ្យមភាគប្រាក់ខែបុគ្គលិក 'រដ្ឋបាល' ដែលប្រាក់ខែ > 300។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ['=AVERAGEIFS(C2:C6,B2:B6,"រដ្ឋបាល",C2:C6,">300")','=averageifs(c2:c6,b2:b6,"រដ្ឋបាល",c2:c6,">300")'],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =AVERAGEIFS(C2:C6,B2:B6,\"រដ្ឋបាល\",C2:C6,\">300\")"
  },
  {
    id: "quest-43",
    titleKh: "43. តភ្ជាប់អត្ថបទ (TEXTJOIN)",
    descriptionKh: "ភ្ជាប់ឈ្មោះបុគ្គលិកទាំងអស់បញ្ចូលគ្នា ដោយខណ្ឌដោយសញ្ញាក្បៀស (,) មិនរាប់បញ្ចូលក្រឡាទទេ។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ['=TEXTJOIN(", ",TRUE,A2:A6)','=textjoin(", ",true,a2:a6)','=TEXTJOIN(", ", TRUE, A2:A6)'],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =TEXTJOIN(\", \",TRUE,A2:A6)"
  },
  {
    id: "quest-44",
    titleKh: "44. តំណភ្ជាប់វេបសាយ (HYPERLINK)",
    descriptionKh: "បង្កើតតំណភ្ជាប់ឈ្មោះបុគ្គលិក A2 ទៅកាន់វេបសាយ google.com ដោយបង្ហាញអត្ថបទ \"ស្វែងរក សុខ ជា\"។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ['=HYPERLINK("https://google.com","ស្វែងរក "&A2)','=hyperlink("https://google.com","ស្វែងរក "&a2)','=HYPERLINK("https://google.com", "ស្វែងរក "&A2)'],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =HYPERLINK(\"https://google.com\",\"ស្វែងរក \"&A2)"
  },
  {
    id: "quest-45",
    titleKh: "45. គំនូសតាងខ្នាតតូច (SPARKLINE)",
    descriptionKh: "បង្កើតរបារក្រាហ្វិករហ័ស (Sparkline) ដើម្បីមើលទំនោរការកើនឡើងប្រាក់ខែពី C2 ដល់ C6។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ['=SPARKLINE(C2:C6)','=sparkline(c2:c6)'],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =SPARKLINE(C2:C6)"
  },
  {
    id: "quest-46",
    titleKh: "46. លាក់ Error ជាមួយ VLOOKUP (IFERROR)",
    descriptionKh: "ស្វែងរកប្រាក់ខែបុគ្គលិកឈ្មោះ \"ដារ៉ា\" បើរកមិនឃើញសូមឱ្យបង្ហាញពាក្យថា \"គ្មានឈ្មោះនេះទេ\"។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ['=IFERROR(VLOOKUP("ដារ៉ា",A2:C6,3,0),"គ្មានឈ្មោះនេះទេ")','=iferror(vlookup("ដារ៉ា",a2:c6,3,0),"គ្មានឈ្មោះនេះទេ")','=IFERROR(VLOOKUP("ដារ៉ា", A2:C6, 3, FALSE), "គ្មានឈ្មោះនេះទេ")'],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =IFERROR(VLOOKUP(\"ដារ៉ា\",A2:C6,3,0),\"គ្មានឈ្មោះនេះទេ\")"
  },
  {
    id: "quest-47",
    titleKh: "47. គណនារយៈពេល (DATEDIF)",
    descriptionKh: "គណនាចំនួនថ្ងៃចន្លោះពី ថ្ងៃទី 01/01/2026 (\"01/01/2026\") ដល់ថ្ងៃនេះ TODAY() ដោយគិតជា \"D\"។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ['=DATEDIF("01/01/2026",TODAY(),"D")','=datedif("01/01/2026",today(),"d")','=DATEDIF("2026-01-01", TODAY(), "D")'],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =DATEDIF(\"01/01/2026\",TODAY(),\"D\")"
  },
  {
    id: "quest-48",
    titleKh: "48. ជំនួសអក្សរជាក់លាក់ (SUBSTITUTE)",
    descriptionKh: "ប្តូរពាក្យ 'រដ្ឋបាល' ទាំងអស់ក្នុងក្រឡា B2 អោយទៅជាពាក្យ 'រដ្ឋបាលទូទៅ'។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ['=SUBSTITUTE(B2,"រដ្ឋបាល","រដ្ឋបាលទូទៅ")','=substitute(b2,"រដ្ឋបាល","រដ្ឋបាលទូទៅ")','=SUBSTITUTE(B2, "រដ្ឋបាល", "រដ្ឋបាលទូទៅ")'],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =SUBSTITUTE(B2,\"រដ្ឋបាល\",\"រដ្ឋបាលទូទៅ\")"
  },
  {
    id: "quest-49",
    titleKh: "49. តម្រៀបជួរឈរ (TRANSPOSE)",
    descriptionKh: "បង្វិលទិន្នន័យឈ្មោះបុគ្គលិកពីត្រឹម A2 ដល់ A6 ពីបញ្ឈរ អោយទៅជាផ្ដេកវិញ។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ['=TRANSPOSE(A2:A6)','=transpose(a2:a6)'],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =TRANSPOSE(A2:A6)"
  },
  {
    id: "quest-50",
    titleKh: "50. បូកសរុបផលិតផល (SUMPRODUCT)",
    descriptionKh: "គុណតម្លៃក្នុងជួរ C2:C6 ជាពិន្ទុ និងបូកសរុបបញ្ចូលគ្នា (ឧបមាថាចង់គុណប្រាក់ខែនឹង 2 សម្រាប់ប្រាក់ចំណេញខែនេះ)។ ប្រើ SUMPRODUCT(C2:C6, 2)",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ['=SUMPRODUCT(C2:C6,2)','=sumproduct(c2:c6,2)','=SUMPRODUCT(C2:C6, 2)'],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =SUMPRODUCT(C2:C6,2)"
  },
  {
    id: "quest-51",
    titleKh: "51. សង់ក្រាប វិភាគទិន្នន័យ (SPARKLINE)",
    descriptionKh: "សង់ក្រាបខ្នាតតូចប្រភេទ Column ដោយផ្អែកលើទិន្នន័យចំណូលក្នុងជួរ C2 ដល់ C6។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ['=SPARKLINE(C2:C6,{"charttype","column"})','=sparkline(c2:c6,{"charttype","column"})','=SPARKLINE(C2:C6, {"charttype","column"})'],
    tableData: [
      { name: "ខែមករា", role: "ចំណូល", salary: 1500 },
      { name: "ខែកុម្ភៈ", role: "ចំណូល", salary: 2800 },
      { name: "ខែមីនា", role: "ចំណូល", salary: 2200 },
      { name: "ខែមេសា", role: "ចំណូល", salary: 3500 },
      { name: "ខែឧសភា", role: "ចំណូល", salary: 4000 }
    ],
    headers: ["ខែ (A)", "ប្រភេទ (B)", "ចំណូល (C)"],
    helperKh: 'គន្លឹះ៖ ឧទាហរណ៍៖ =SPARKLINE(C2:C6,{"charttype","column"})'
  },
  {
    id: "quest-52",
    titleKh: "52. ការរៀបបញ្ជីប្រាក់ខែ (IF)",
    descriptionKh: "ផ្តល់ប្រាក់រង្វាន់ (Bonus) ចំនួន 50$ សម្រាប់អ្នកមានប្រាក់ខែក្រោម 400$ ក្នុងក្រឡា C2 បើមិនអញ្ចឹងទេផ្តល់ត្រឹម 0$។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត (ប្រាក់រង្វាន់)",
    correctAnswers: ['=IF(C2<400, 50, 0)','=if(c2<400, 50, 0)','=IF(C2<400,50,0)'],
    tableData: [
      { name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: 'គន្លឹះ៖ ឧទាហរណ៍៖ =IF(C2<400, 50, 0)'
  },
  {
    id: "quest-53",
    titleKh: "53. ការរៀបបញ្ជីវត្តមាន (COUNTIF)",
    descriptionKh: "រាប់សរុបចំនួនថ្ងៃវត្តមានពិតប្រាកដ (អក្សរ P) របស់បុគ្គលិកឈ្មោះស៊ិន សូនី តាំងពី C5 ដល់ G5។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត (ចំនួនថ្ងៃវត្តមាន)",
    correctAnswers: ['=COUNTIF(C5:G5, "P")','=countif(c5:g5, "P")','=COUNTIF(C5:G5,"P")','=COUNTIF(C5:G5, "p")'],
    tableData: [
      { name: "សុខ ជា", role: "P", c: "P", d: "A", e: "P", f: "P" },
      { name: "ចាន់ ធារី", role: "P", c: "A", d: "A", e: "P", f: "P" },
      { name: "ម៉ៅ វិបុល", role: "P", c: "P", d: "P", e: "A", f: "P" },
      { name: "ស៊ិន សូនី", role: "P", c: "P", d: "P", e: "P", f: "P" }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "ចន្ទ (C)", "អង្គារ (D)", "ពុធ (E)", "ព្រហ (F)", "សុក្រ (G)"],
    helperKh: 'គន្លឹះ៖ ឧទាហរណ៍៖ =COUNTIF(C5:G5, "P")'
  },
  {
    id: "quest-54",
    titleKh: "54. ការស្វែងរកអ្នកឈប់ (FILTER)",
    descriptionKh: "ទាញយកឈ្មោះបុគ្គលិកពី A2 ដល់ A5 ណាដែលឈប់សម្រាក (មានអក្សរ 'A' នៅជួរ C)",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ['=FILTER(A2:A5, C2:C5="A")','=filter(a2:a5, c2:c5="A")','=FILTER(A2:A5,C2:C5="A")','=FILTER(A2:A5, C2:C5="a")'],
    tableData: [
      { name: "សុខ ជា", absentDesc: "មិត្តភក្ដិ", type: "P" },
      { name: "ចាន់ ធារី", absentDesc: "ឈឺ", type: "A" },
      { name: "ម៉ៅ វិបុល", absentDesc: "ធម្មតា", type: "P" },
      { name: "ស៊ិន សូនី", absentDesc: "សុំច្បាប់", type: "A" }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "មូលហេតុ (B)", "ស្ថានភាព (C)"],
    helperKh: 'គន្លឹះ៖ ឧទាហរណ៍៖ =FILTER(A2:A5, C2:C5="A")'
  },
  {
    id: "quest-55",
    titleKh: "55. ស្វែងរកក្រុមអាយុ (IFS)",
    descriptionKh: "បែងចែកក្រុមអាយុក្នុងក្រឡា C2: បើ < 20 ដាក់ 'ក្មេង', បើ < 30 ដាក់ 'យុវជន', បើក្រៅពីនេះដាក់ 'ចាស់'។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត (ក្រុមអាយុ)",
    correctAnswers: ['=IFS(C2<20, "ក្មេង", C2<30, "យុវជន", TRUE, "ចាស់")','=ifs(c2<20,"ក្មេង",c2<30,"យុវជន",true,"ចាស់")','=IFS(C2<20,"ក្មេង", C2<30,"យុវជន", TRUE,"ចាស់")'],
    tableData: [
      { name: "សុខ ជា", role: "និស្សិត", salary: 18 },
      { name: "ចាន់ ធារី", role: "បុគ្គលិក", salary: 25 },
      { name: "ម៉ៅ វិបុល", role: "ប្រធាន", salary: 45 }
    ],
    headers: ["ឈ្មោះបុគ្គលិក (A)", "មុខរបរ (B)", "អាយុ (C)"],
    helperKh: 'គន្លឹះ៖ ឧទាហរណ៍៖ =IFS(C2<20, "ក្មេង", C2<30, "យុវជន", TRUE, "ចាស់")'
  }
];

export const taxBracketsCambodia = [
  { limitKh: "០ ដល់ ១,៥០០,០០០ រៀល", rate: 0, rateStr: "0%", deduction: 0 },
  { limitKh: "១,៥០០,០០១ ដល់ ២,០០០,០០០ រៀល", rate: 5, rateStr: "5%", deduction: 75000 },
  { limitKh: "២,០០០,០០១ ដល់ ៨,៥០០,០០០ រៀល", rate: 10, rateStr: "10%", deduction: 175000 },
  { limitKh: "៨,៥០០,០០១ ដល់ ១២,៥០០,០០០ រៀល", rate: 15, rateStr: "15%", deduction: 600000 },
  { limitKh: "លើសពី ១២,៥០០,០០០ រៀល", rate: 20, rateStr: "20%", deduction: 1225000 }
];
