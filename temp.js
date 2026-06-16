const formulaQuests = [
  {
    id: "quest-1",
    titleKh: "1. បូកសរុប (SUM)",
    descriptionKh: "បូកសរុបប្រាក់ខែបុគ្គលិកទាំងអស់ក្នុងជួរ C ពី C2 ដល់ C6។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=SUM(C2:C6)","=sum(c2:c6)"],
    tableData: [
      { id: 1, name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { id: 2, name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { id: 3, name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { id: 4, name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { id: 5, name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ល.រ", "មុខតំណែង (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =SUM(C2:C6)"
  },
  {
    id: "quest-2",
    titleKh: "2. មធ្យមភាគ (AVERAGE)",
    descriptionKh: "រកមធ្យមភាគប្រាក់ខែពី C2 ដល់ C6។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=AVERAGE(C2:C6)","=average(c2:c6)"],
    tableData: [
      { id: 1, name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { id: 2, name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { id: 3, name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { id: 4, name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { id: 5, name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ល.រ", "មុខតំណែង (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =AVERAGE(C2:C6)"
  },
  {
    id: "quest-3",
    titleKh: "3. តម្លៃធំបំផុត (MAX)",
    descriptionKh: "រកប្រាក់ខែដែលខ្ពស់បំផុតពី C2 ដល់ C6។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=MAX(C2:C6)","=max(c2:c6)"],
    tableData: [
      { id: 1, name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { id: 2, name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { id: 3, name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { id: 4, name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { id: 5, name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ល.រ", "មុខតំណែង (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =MAX(C2:C6)"
  },
  {
    id: "quest-4",
    titleKh: "4. តម្លៃតូចបំផុត (MIN)",
    descriptionKh: "រកប្រាក់ខែដែលទាបបំផុតពី C2 ដល់ C6។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=MIN(C2:C6)","=min(c2:c6)"],
    tableData: [
      { id: 1, name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { id: 2, name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { id: 3, name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { id: 4, name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { id: 5, name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ល.រ", "មុខតំណែង (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =MIN(C2:C6)"
  },
  {
    id: "quest-5",
    titleKh: "5. រាប់ចំនួនលេខ (COUNT)",
    descriptionKh: "រាប់ចំនួនក្រឡាដែលមានលេខក្នុងជួរ C2 ដល់ C6។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=COUNT(C2:C6)","=count(c2:c6)"],
    tableData: [
      { id: 1, name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { id: 2, name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { id: 3, name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { id: 4, name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { id: 5, name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ល.រ", "មុខតំណែង (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =COUNT(C2:C6)"
  },
  {
    id: "quest-6",
    titleKh: "6. រាប់ចំនួនអត្ថបទនិងលេខ (COUNTA)",
    descriptionKh: "រាប់ចំនួនក្រឡាដែលមានទិន្នន័យ (មិនទទេ) ក្នុងជួរ B2 ដល់ B6។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=COUNTA(B2:B6)","=counta(b2:b6)"],
    tableData: [
      { id: 1, name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { id: 2, name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { id: 3, name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { id: 4, name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { id: 5, name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ល.រ", "មុខតំណែង (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =COUNTA(B2:B6)"
  },
  {
    id: "quest-7",
    titleKh: "7. លក្ខខណ្ឌសាមញ្ញ (IF)",
    descriptionKh: "ប្រសិនបើប្រាក់ខែ C2 ធំជាងឬស្មើ 500 បង្ហាញពាក្យ \"ខ្ពស់\" បើមិនពិតបង្ហាញពាក្យ \"ធម្មតា\"។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=IF(C2>=500,\"ខ្ពស់\",\"ធម្មតា\")","=if(c2>=500,\"ខ្ពស់\",\"ធម្មតា\")","=IF(C2>=500, \"ខ្ពស់\", \"ធម្មតា\")"],
    tableData: [
      { id: 1, name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { id: 2, name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { id: 3, name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { id: 4, name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { id: 5, name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ល.រ", "មុខតំណែង (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =IF(C2>=500,\"ខ្ពស់\",\"ធម្មតា\")"
  },
  {
    id: "quest-8",
    titleKh: "8. រាប់តាមលក្ខខណ្ឌ (COUNTIF)",
    descriptionKh: "រាប់ចំនួនបុគ្គលិកដែលមានផ្នែកជា \"រដ្ឋបាល\" ក្នុងជួរ B2 ដល់ B6។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=COUNTIF(B2:B6,\"រដ្ឋបាល\")","=countif(b2:b6,\"រដ្ឋបាល\")"],
    tableData: [
      { id: 1, name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { id: 2, name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { id: 3, name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { id: 4, name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { id: 5, name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ល.រ", "មុខតំណែង (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =COUNTIF(B2:B6,\"រដ្ឋបាល\")"
  },
  {
    id: "quest-9",
    titleKh: "9. បូកតាមលក្ខខណ្ឌ (SUMIF)",
    descriptionKh: "បូកសរុបប្រាក់ខែតែផ្នែក \"រដ្ឋបាល\" (លក្ខខណ្ឌ B2:B6, បូក C2:C6)។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=SUMIF(B2:B6,\"រដ្ឋបាល\",C2:C6)","=sumif(b2:b6,\"រដ្ឋបាល\",c2:c6)"],
    tableData: [
      { id: 1, name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { id: 2, name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { id: 3, name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { id: 4, name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { id: 5, name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ល.រ", "មុខតំណែង (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =SUMIF(B2:B6,\"រដ្ឋបាល\",C2:C6)"
  },
  {
    id: "quest-10",
    titleKh: "10. ស្វែងរកទិន្នន័យបញ្ឈរ (VLOOKUP)",
    descriptionKh: "ស្វែងរកប្រាក់ខែរបស់ \"សុខ ជា\" ដោយប្រើឈ្មោះជាអត្តសញ្ញាណ ក្នុងតារាង A2:C6 ជួរឈរទី 3 (Exact match)។ ឧបមាថាយើងយកឈ្មោះ \"សុខ ជា\"។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=VLOOKUP(\"សុខ ជា\",A2:C6,3,FALSE)","=vlookup(\"សុខ ជា\",a2:c6,3,false)","=VLOOKUP(\"សុខ ជា\",A2:C6,3,0)"],
    tableData: [
      { id: 1, name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { id: 2, name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { id: 3, name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { id: 4, name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { id: 5, name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ល.រ", "មុខតំណែង (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =VLOOKUP(\"សុខ ជា\",A2:C6,3,FALSE)"
  },
  {
    id: "quest-11",
    titleKh: "11. ភ្ជាប់អត្ថបទ (CONCATENATE)",
    descriptionKh: "ភ្ជាប់ឈ្មោះ \"សុខ\" (A2) និង \"ជា\" (B2) បញ្ចូលគ្នាឲ្យមានដកឃ្លាចំកណ្តាល។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=CONCATENATE(A2,\" \",B2)","=concatenate(a2,\" \",b2)","=A2&\" \"&B2","=a2&\" \"&b2"],
    tableData: [
      { id: 1, name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { id: 2, name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { id: 3, name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { id: 4, name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { id: 5, name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ល.រ", "មុខតំណែង (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =CONCATENATE(A2,\" \",B2) ឬ =A2&\" \"&B2"
  },
  {
    id: "quest-12",
    titleKh: "12. កាត់យកអក្សរពីឆ្វេង (LEFT)",
    descriptionKh: "យក ២តួអក្សរដំបូងនៃ \"កម្ពុជា\" ពីក្រឡា A2។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=LEFT(A2,2)","=left(a2,2)"],
    tableData: [
      { id: 1, name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { id: 2, name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { id: 3, name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { id: 4, name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { id: 5, name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ល.រ", "មុខតំណែង (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =LEFT(A2,2)"
  },
  {
    id: "quest-13",
    titleKh: "13. កាត់យកអក្សរពីស្តាំ (RIGHT)",
    descriptionKh: "យក ២តួអក្សរចុងក្រោយពីក្រឡា A2។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=RIGHT(A2,2)","=right(a2,2)"],
    tableData: [
      { id: 1, name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { id: 2, name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { id: 3, name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { id: 4, name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { id: 5, name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ល.រ", "មុខតំណែង (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =RIGHT(A2,2)"
  },
  {
    id: "quest-14",
    titleKh: "14. កាត់យកអក្សរកណ្តាល (MID)",
    descriptionKh: "យក ៣តួអក្សរចាប់ពីតួទី ២ នៃក្រឡា A2។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=MID(A2,2,3)","=mid(a2,2,3)"],
    tableData: [
      { id: 1, name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { id: 2, name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { id: 3, name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { id: 4, name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { id: 5, name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ល.រ", "មុខតំណែង (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =MID(A2,2,3)"
  },
  {
    id: "quest-15",
    titleKh: "15. រាប់ចំនួនតួអក្សរ (LEN)",
    descriptionKh: "រាប់ចំនួនតួអក្សរក្នុងឈ្មោះ (ក្រឡា B2)។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=LEN(B2)","=len(b2)"],
    tableData: [
      { id: 1, name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { id: 2, name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { id: 3, name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { id: 4, name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { id: 5, name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ល.រ", "មុខតំណែង (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =LEN(B2)"
  },
  {
    id: "quest-16",
    titleKh: "16. លុបចន្លោះដកឃ្លាដែលលើស (TRIM)",
    descriptionKh: "លុបការដកឃ្លាដែលមិនចាំបាច់ចេញពីឈ្មោះក្នុង (ក្រឡា B2)។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=TRIM(B2)","=trim(b2)"],
    tableData: [
      { id: 1, name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { id: 2, name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { id: 3, name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { id: 4, name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { id: 5, name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ល.រ", "មុខតំណែង (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =TRIM(B2)"
  },
  {
    id: "quest-17",
    titleKh: "17. ប្តូរអក្សរតូចជាអក្សរធំ (UPPER)",
    descriptionKh: "ប្តូរអក្សរអង់គ្លេសក្នុងក្រឡា B2 ទៅជាដុំធំ (Capital Letters)។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=UPPER(B2)","=upper(b2)"],
    tableData: [
      { id: 1, name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { id: 2, name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { id: 3, name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { id: 4, name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { id: 5, name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ល.រ", "មុខតំណែង (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =UPPER(B2)"
  },
  {
    id: "quest-18",
    titleKh: "18. ប្តូរអក្សរធំជាអក្សរតូច (LOWER)",
    descriptionKh: "ប្តូរអក្សរក្នុងក្រឡា B2 ទៅជាអក្សរតូច។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=LOWER(B2)","=lower(b2)"],
    tableData: [
      { id: 1, name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { id: 2, name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { id: 3, name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { id: 4, name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { id: 5, name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ល.រ", "មុខតំណែង (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =LOWER(B2)"
  },
  {
    id: "quest-19",
    titleKh: "19. ប្តូរតួអក្សរដើមធំ (PROPER)",
    descriptionKh: "ប្តូរតួអក្សរទីមួយនៃពាក្យក្នុង B2 ទៅជាអក្សរធំ។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=PROPER(B2)","=proper(b2)"],
    tableData: [
      { id: 1, name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { id: 2, name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { id: 3, name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { id: 4, name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { id: 5, name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ល.រ", "មុខតំណែង (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =PROPER(B2)"
  },
  {
    id: "quest-20",
    titleKh: "20. ថ្ងៃខែឆ្នាំបច្ចុប្បន្ន (TODAY)",
    descriptionKh: "បង្ហាញកាលបរិច្ឆេទថ្ងៃនេះក្នុង Sheet។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=TODAY()","=today()"],
    tableData: [
      { id: 1, name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { id: 2, name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { id: 3, name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { id: 4, name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { id: 5, name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ល.រ", "មុខតំណែង (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =TODAY()"
  },
  {
    id: "quest-21",
    titleKh: "21. ម៉ោងនិងថ្ងៃខែ (NOW)",
    descriptionKh: "បង្ហាញកាលបរិច្ឆេទនិងម៉ោងបច្ចុប្បន្ន។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=NOW()","=now()"],
    tableData: [
      { id: 1, name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { id: 2, name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { id: 3, name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { id: 4, name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { id: 5, name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ល.រ", "មុខតំណែង (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =NOW()"
  },
  {
    id: "quest-22",
    titleKh: "22. លាក់កំហុសរូបមន្ត (IFERROR)",
    descriptionKh: "បើសិនការស្វែងរកខុសឆ្គង (Error) ឲ្យបង្ហាញពាក្យ \"គ្មាន\" ជាការជំនួស (អនុវត្តជាមួយ A2)។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=IFERROR(A2,\"គ្មាន\")","=iferror(a2,\"គ្មាន\")"],
    tableData: [
      { id: 1, name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { id: 2, name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { id: 3, name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { id: 4, name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { id: 5, name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ល.រ", "មុខតំណែង (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =IFERROR(A2,\"គ្មាន\")"
  },
  {
    id: "quest-23",
    titleKh: "23. បូកមានលក្ខខណ្ឌច្រើន (SUMIFS)",
    descriptionKh: "បូកប្រាក់ខែ (C2:C6) សម្រាប់តែផ្នែក \"រដ្ឋបាល\" (B2:B6) និងប្រាក់ខែធំជាង 300។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=SUMIFS(C2:C6,B2:B6,\"រដ្ឋបាល\",C2:C6,\">300\")","=sumifs(c2:c6,b2:b6,\"រដ្ឋបាល\",c2:c6,\">300\")"],
    tableData: [
      { id: 1, name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { id: 2, name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { id: 3, name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { id: 4, name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { id: 5, name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ល.រ", "មុខតំណែង (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =SUMIFS(C2:C6,B2:B6,\"រដ្ឋបាល\",C2:C6,\">300\")"
  },
  {
    id: "quest-24",
    titleKh: "24. រាប់មានលក្ខខណ្ឌច្រើន (COUNTIFS)",
    descriptionKh: "រាប់បុគ្គលិក \"រដ្ឋបាល\" (B2:B6) ដែលមានមុខតំណែង \"មន្ត្រីការិយាល័យ\" (D2:D6)។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=COUNTIFS(B2:B6,\"រដ្ឋបាល\",D2:D6,\"មន្ត្រីការិយាល័យ\")","=countifs(b2:b6,\"រដ្ឋបាល\",d2:d6,\"មន្ត្រីការិយាល័យ\")"],
    tableData: [
      { id: 1, name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { id: 2, name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { id: 3, name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { id: 4, name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { id: 5, name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ល.រ", "មុខតំណែង (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =COUNTIFS(B2:B6,\"រដ្ឋបាល\",D2:D6,\"មន្ត្រីការិយាល័យ\")"
  },
  {
    id: "quest-25",
    titleKh: "25. ទាញយកទិន្នន័យ (INDEX)",
    descriptionKh: "យកទិន្នន័យនៅជួរទី 2 កូឡោនទី 3 ពីតារាង A2:C6។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=INDEX(A2:C6,2,3)","=index(a2:c6,2,3)"],
    tableData: [
      { id: 1, name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { id: 2, name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { id: 3, name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { id: 4, name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { id: 5, name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ល.រ", "មុខតំណែង (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =INDEX(A2:C6,2,3)"
  },
  {
    id: "quest-26",
    titleKh: "26. រកចន្លោះរៀង (MATCH)",
    descriptionKh: "ស្វែងរកទីតាំងរៀងនៃពាក្យ \"សុខ ជា\" ក្នុងជួរឈរ B2:B6 (Exact match)។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=MATCH(\"សុខ ជា\",B2:B6,0)","=match(\"សុខ ជា\",b2:b6,0)"],
    tableData: [
      { id: 1, name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { id: 2, name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { id: 3, name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { id: 4, name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { id: 5, name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ល.រ", "មុខតំណែង (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =MATCH(\"សុខ ជា\",B2:B6,0)"
  },
  {
    id: "quest-27",
    titleKh: "27. INDEX រួម MATCH",
    descriptionKh: "ទាញយកប្រាក់ខែយោងមុខតំណែង។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=INDEX(C2:C6,MATCH(\"សុខ ជា\",B2:B6,0))","=index(c2:c6,match(\"សុខ ជា\",b2:b6,0))"],
    tableData: [
      { id: 1, name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { id: 2, name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { id: 3, name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { id: 4, name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { id: 5, name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ល.រ", "មុខតំណែង (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =INDEX(C2:C6,MATCH(\"សុខ ជា\",B2:B6,0))"
  },
  {
    id: "quest-28",
    titleKh: "28. ទាញយកតម្លៃមិនជាន់គ្នា (UNIQUE)",
    descriptionKh: "ដកស្រង់តែឈ្មោះផ្នែកដែលមិនជាន់គ្នាពីជួរ B2:B6។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=UNIQUE(B2:B6)","=unique(b2:b6)"],
    tableData: [
      { id: 1, name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { id: 2, name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { id: 3, name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { id: 4, name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { id: 5, name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ល.រ", "មុខតំណែង (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =UNIQUE(B2:B6)"
  },
  {
    id: "quest-29",
    titleKh: "29. តម្រៀបទិន្នន័យ (SORT)",
    descriptionKh: "តម្រៀបទិន្នន័យពី B2:B6 តាមអក្ខរក្រមពី ក-អ។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=SORT(B2:B6)","=sort(b2:b6)"],
    tableData: [
      { id: 1, name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { id: 2, name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { id: 3, name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { id: 4, name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { id: 5, name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ល.រ", "មុខតំណែង (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =SORT(B2:B6)"
  },
  {
    id: "quest-30",
    titleKh: "30. ត្រងទិន្នន័យ (FILTER)",
    descriptionKh: "ត្រងយកតែបុគ្គលិកដែលមានប្រាក់ខែលើស 400 (ទីតាំងឈ្មោះ A2:A6, ទីតាំងប្រាក់ខែ C2:C6)។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=FILTER(A2:A6,C2:C6>400)","=filter(a2:a6,c2:c6>400)","=FILTER(A2:A6, C2:C6>400)"],
    tableData: [
      { id: 1, name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { id: 2, name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { id: 3, name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { id: 4, name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { id: 5, name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ល.រ", "មុខតំណែង (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =FILTER(A2:A6,C2:C6>400)"
  },
  {
    id: "quest-31",
    titleKh: "31. លោតរំកិលក្រឡា (OFFSET)",
    descriptionKh: "ចាប់ផ្តើមពី A2 រួចរំកិលចុះក្រោម ១ ជួរ និងទៅស្តាំ ២ ជួរឈរ។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=OFFSET(A2,1,2)","=offset(a2,1,2)"],
    tableData: [
      { id: 1, name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { id: 2, name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { id: 3, name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { id: 4, name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { id: 5, name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ល.រ", "មុខតំណែង (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =OFFSET(A2,1,2)"
  },
  {
    id: "quest-32",
    titleKh: "32. បម្លែងអត្ថបទទៅជាក្រឡា (INDIRECT)",
    descriptionKh: "ទាញយកទិន្នន័យពីក្រឡា C4 ដោយការផ្សំអក្សរ \"C\" និងលេខ 4។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=INDIRECT(\"C\"&4)","=indirect(\"c\"&4)","=INDIRECT(\"C4\")","=indirect(\"c4\")"],
    tableData: [
      { id: 1, name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { id: 2, name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { id: 3, name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { id: 4, name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { id: 5, name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ល.រ", "មុខតំណែង (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =INDIRECT(\"C\"&4)"
  },
  {
    id: "quest-33",
    titleKh: "33. ស្វែងរកទំនើប (XLOOKUP)",
    descriptionKh: "ប្រើ XLOOKUP ស្វែងរក \"កែវ មុនី\" ក្នុងជួរ A2:A6 រួចទាញយកផ្នែកការងារពីជួរ B2:B6។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=XLOOKUP(\"កែវ មុនី\",A2:A6,B2:B6)","=xlookup(\"កែវ មុនី\",a2:a6,b2:b6)","=XLOOKUP(\"កែវ មុនី\", A2:A6, B2:B6)"],
    tableData: [
      { id: 1, name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { id: 2, name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { id: 3, name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { id: 4, name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { id: 5, name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ល.រ", "មុខតំណែង (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =XLOOKUP(\"កែវ មុនី\",A2:A6,B2:B6)"
  },
  {
    id: "quest-34",
    titleKh: "34. រកទីតាំងនៃតម្លៃធំបំផុត (MATCH MAX)",
    descriptionKh: "រកទីតាំងរៀងនៃបុគ្គលិកដែលមានប្រាក់ខែខ្ពស់បំផុតក្នុងជួរ C2:C6 ដោយប្រើ MAX រួមបញ្ចូលជាមួយ MATCH។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=MATCH(MAX(C2:C6),C2:C6,0)","=match(max(c2:c6),c2:c6,0)"],
    tableData: [
      { id: 1, name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { id: 2, name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { id: 3, name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { id: 4, name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { id: 5, name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ល.រ", "មុខតំណែង (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =MATCH(MAX(C2:C6),C2:C6,0)"
  },
  {
    id: "quest-35",
    titleKh: "35. ទាញយកឈ្មោះប្រាក់ខែខ្ពស់ (INDEX-MATCH MAX)",
    descriptionKh: "ទាញយកឈ្មោះបុគ្គលិក(A2:A6) ដែលមានប្រាក់ខែខ្ពស់ជាងគេដោយប្រើ MAX ក្នុងឯកសារនេះ។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=INDEX(A2:A6,MATCH(MAX(C2:C6),C2:C6,0))","=index(a2:a6,match(max(c2:c6),c2:c6,0))"],
    tableData: [
      { id: 1, name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { id: 2, name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { id: 3, name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { id: 4, name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { id: 5, name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ល.រ", "មុខតំណែង (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =INDEX(A2:A6,MATCH(MAX(C2:C6),C2:C6,0))"
  },
  {
    id: "quest-36",
    titleKh: "36. ពិនិត្យក្រឡាទទេ (ISBLANK)",
    descriptionKh: "ពិនិត្យមើលថាតើក្រឡាប្រាក់ខែ C2 ជាក្រឡាទទេ (Blank) ដែរឬទេ។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=ISBLANK(C2)","=isblank(c2)"],
    tableData: [
      { id: 1, name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { id: 2, name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { id: 3, name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { id: 4, name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { id: 5, name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ល.រ", "មុខតំណែង (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =ISBLANK(C2)"
  },
  {
    id: "quest-37",
    titleKh: "37. បម្លែងទម្រង់លេខ (TEXT)",
    descriptionKh: "បម្លែងប្រាក់ខែ C2 ទៅជាអត្ថបទដែលមានទម្រង់សញ្ញាដុល្លារ និងក្បៀស \"$#,##0.00\"។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=TEXT(C2,\"$#,##0.00\")","=text(c2,\"$#,##0.00\")"],
    tableData: [
      { id: 1, name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { id: 2, name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { id: 3, name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { id: 4, name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { id: 5, name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ល.រ", "មុខតំណែង (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =TEXT(C2,\"$#,##0.00\")"
  },
  {
    id: "quest-38",
    titleKh: "38. បំបែកអត្ថបទ (SPLIT)",
    descriptionKh: "បំបែកឈ្មោះ \"សុខ ជា\" (A2) ទៅជាពីរក្រឡាដោយប្រើសញ្ញាដកឃ្លា។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=SPLIT(A2,\" \")","=split(a2,\" \")"],
    tableData: [
      { id: 1, name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { id: 2, name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { id: 3, name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { id: 4, name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { id: 5, name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ល.រ", "មុខតំណែង (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =SPLIT(A2,\" \")"
  },
  {
    id: "quest-39",
    titleKh: "39. ស្វែងរកទីតាំងនវានុវត្តន៍ (XMATCH)",
    descriptionKh: "ស្វែងរកទីតាំងជួរដេករបស់ \"ម៉ៅ វិបុល\" ក្នុង A2:A6 ដោយប្រើ XMATCH។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=XMATCH(\"ម៉ៅ វិបុល\",A2:A6)","=xmatch(\"ម៉ៅ វិបុល\",a2:a6)"],
    tableData: [
      { id: 1, name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { id: 2, name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { id: 3, name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { id: 4, name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { id: 5, name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ល.រ", "មុខតំណែង (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =XMATCH(\"ម៉ៅ វិបុល\",A2:A6)"
  },
  {
    id: "quest-40",
    titleKh: "40. ចម្រោះទិន្នន័យឆ្លាតវៃ (QUERY)",
    descriptionKh: "ប្រើ QUERY ទាញយកតែកូឡោន A (ឈ្មោះ) និង C (ប្រាក់ខែ) ពីតារាង A1:C6 សម្រាប់តែប្រាក់ខែ > 400។",
    targetCell: "ទីតាំងបញ្ចូលរូបមន្ត",
    correctAnswers: ["=QUERY(A1:C6,\"SELECT A, C WHERE C > 400\")","=query(a1:c6,\"select a, c where c > 400\")","=QUERY(A1:C6, \"SELECT A, C WHERE C > 400\")"],
    tableData: [
      { id: 1, name: "សុខ ជា", role: "រដ្ឋបាល", salary: 350 },
      { id: 2, name: "ចាន់ ធារី", role: "គណនេយ្យ", salary: 500 },
      { id: 3, name: "ម៉ៅ វិបុល", role: "លក់", salary: 280 },
      { id: 4, name: "ស៊ិន សូនី", role: "រដ្ឋបាល", salary: 400 },
      { id: 5, name: "កែវ មុនី", role: "ដឹកនាំ", salary: 800 }
    ],
    headers: ["ល.រ", "មុខតំណែង (A)", "ផ្នែកការងារ (B)", "ប្រាក់ខែ (C)"],
    helperKh: "គន្លឹះ៖ ឧទាហរណ៍៖ =QUERY(A1:C6,\"SELECT A, C WHERE C > 400\")"
  }
];
console.log(formulaQuests.find(q => !q.correctAnswers || q.correctAnswers.length === 0));