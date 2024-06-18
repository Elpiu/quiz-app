export interface Option {
  id_option: string;
  option: string;
}

export interface Answer {
  id_options: string[];
  explanation: string;
}

export interface Question {
  id_question: number;
  chapter: string;
  question: string;
  options: Option[];
  answer?: Answer;
}