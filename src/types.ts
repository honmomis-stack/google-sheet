export interface Lesson {
  id: string;
  titleKh: string;
  titleEn: string;
  descriptionKh: string;
  difficulty: "ងាយស្រួល" | "មធ្យម" | "កម្រិតខ្ពស់";
  duration: string;
  icon: string;
  youtubeId?: string;
  tutorialContent?: string;
}

export interface FormulaQuest {
  id: string;
  titleKh: string;
  descriptionKh: string;
  targetCell: string;
  correctAnswers: string[]; // List of acceptable accurate formulas e.g., ["=SUM(C2:C5)", "=sum(c2:c5)"]
  tableData: any[];
  headers: string[];
  helperKh: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model" | "system";
  text: string;
  timestamp: Date;
}
