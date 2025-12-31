
export enum Period {
  DIVAN = 'DIVAN',
  TANZIMAT = 'TANZIMAT',
  SERVETIFUNUN = 'SERVETIFUNUN',
  MILLI = 'MILLI',
  CUMHURIYET = 'CUMHURIYET'
}

export interface PeriodInfo {
  id: Period;
  title: string;
  description: string;
  color: string;
  accent: string;
  era: string;
  keyConcepts: string[];
  authors: string[];
  works: string[];
  mission: string;
}

export interface CollectionItem {
  id: string;
  type: 'AUTHOR' | 'WORK' | 'TERM';
  name: string;
  period: Period;
  unlocked: boolean;
  imageUrl?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}
