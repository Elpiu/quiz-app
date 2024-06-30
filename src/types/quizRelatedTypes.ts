type  Option = {
  id_option: string;
  option: string;
}

type  Answer = {
  id_options: string[];
  explanation?: string;
}

type  Question = {
  id_question: number;
  question: string;
  options: Option[];
  answer?: Answer;
}

type Chapter = {
  id: number;
  chapterName: string;
  questions: Question[],
}

type Pair<A, B> = [A, B]

interface LocalQuestion  {
  question?: string,
  options: Pair<number,string>[]
  ansuwers: number[]
  optionCounter: number
}