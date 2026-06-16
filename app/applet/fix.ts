import * as fs from 'fs';
let content = fs.readFileSync('src/data/lessonsData.ts', 'utf8');

// We just replace the whole section from quest-41 carefully
const regex = /\{[\s\S]*?id: "quest-41"[\s\S]*\}\n\];/;

const newContent = `  {
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
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =AVERAGEIF(B2:B6,\\\"រដ្ឋបាល\\\",C2:C6)"
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
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =AVERAGEIFS(C2:C6,B2:B6,\\\"រដ្ឋបាល\\\",C2:C6,\\\">300\\\")"
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
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =TEXTJOIN(\\\", \\\",TRUE,A2:A6)"
  },
  {
    id: "quest-44",
    titleKh: "44. តំណភ្ជាប់វេបសាយ (HYPERLINK)",
    descriptionKh: "បង្កើតតំណភ្ជាប់ឈ្មោះបុគ្គលិក A2 ទៅកាន់វេបសាយ google.com ដោយបង្ហាញអត្ថបទ \\\"ស្វែងរក សុខ ជា\\\"។",
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
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =HYPERLINK(\\\"https://google.com\\\",\\\"ស្វែងរក \\\"&A2)"
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
    descriptionKh: "ស្វែងរកប្រាក់ខែបុគ្គលិកឈ្មោះ \\\"ដារ៉ា\\\" បើរកមិនឃើញសូមឱ្យបង្ហាញពាក្យថា \\\"គ្មានឈ្មោះនេះទេ\\\"។",
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
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =IFERROR(VLOOKUP(\\\"ដារ៉ា\\\",A2:C6,3,0),\\\"គ្មានឈ្មោះនេះទេ\\\")"
  },
  {
    id: "quest-47",
    titleKh: "47. គណនារយៈពេល (DATEDIF)",
    descriptionKh: "គណនាចំនួនថ្ងៃចន្លោះពី ថ្ងៃទី 01/01/2026 (\\\"01/01/2026\\\") ដល់ថ្ងៃនេះ TODAY() ដោយគិតជា \\\"D\\\"។",
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
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =DATEDIF(\\\"01/01/2026\\\",TODAY(),\\\"D\\\")"
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
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =SUBSTITUTE(B2,\\\"រដ្ឋបាល\\\",\\\"រដ្ឋបាលទូទៅ\\\")"
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
  }
];`;

content = content.replace(regex, newContent);
fs.writeFileSync('src/data/lessonsData.ts', content);
