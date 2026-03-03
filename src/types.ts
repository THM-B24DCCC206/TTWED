export interface Subject {
  id: string;
  name: string;
}

export interface StudySession {
  id: string;
  subjectId: string;
  date: string;
  duration: number;
  content: string;
  note: string;
}

export interface MonthlyGoal {
  id: string;
  subjectId?: string;
  month: string;
  targetMinutes: number;
}