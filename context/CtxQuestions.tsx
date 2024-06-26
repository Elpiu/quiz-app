"use client"

import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {Chapters} from "@/types/quizRelatedTypes";

// Importa i tuoi file JSON
import assessmentTest from '../myData/dataJson/Assessment Test.json';
import chapter1 from '../myData/dataJson/Chapter 1.json';
import chapter2 from '../myData/dataJson/Chapter 2.json';
import chapter3 from '../myData/dataJson/Chapter 3.json';
import chapter4 from '../myData/dataJson/Chapter 4.json';
import chapter5 from '../myData/dataJson/Chapter 5.json';
import chapter6 from '../myData/dataJson/Chapter 6.json';
import chapter7 from '../myData/dataJson/Chapter 7.json';
import chapter8 from '../myData/dataJson/Chapter 8.json';
import chapter9 from '../myData/dataJson/Chapter 9.json';
import chapter10 from '../myData/dataJson/Chapter 10.json';
import chapter11 from '../myData/dataJson/Chapter 11.json';
import chapter12 from '../myData/dataJson/Chapter 12.json';


type CtxChaptersType = Chapter[];

export const CtxQuestionsContext =
  createContext<CtxChaptersType | null>(null)

type CtxQuestionsContextProviderProps = {
  children: ReactNode;
}

export function CtxQuestionsProvider({children}: Readonly<CtxQuestionsContextProviderProps>) {

  const [ allChapters, setAllChapters ] =
    useState<CtxChaptersType | null>(null);

  useEffect(() => {
    if(!allChapters){
// Carica tutti i dati JSON
      const loadedChapters: Chapters[] = [
        assessmentTest,
        chapter1,
        chapter2,
        chapter3,
        chapter4,
        chapter5,
        chapter6,
        chapter7,
        chapter8,
        chapter9,
        chapter10,
        chapter11,
        chapter12
      ];

      setAllChapters(loadedChapters);
    }
  }, []);

  if(!allChapters){
    return <h1>Loading...</h1>;
  }

  return (
    <CtxQuestionsContext.Provider value={allChapters}>
      {children}
    </CtxQuestionsContext.Provider>
  )

}

export function useCtxQuestionsContext(): CtxChaptersType {
  const context = useContext(CtxQuestionsContext);
  if(context === null) {
    throw new Error("useCtxQuestions must be used within the context");
  }
  return context;
}

export function useCtxQuestionsContextForGetChapter(input: string | number){
  let chapters = useCtxQuestionsContext();

  if (typeof input === 'string') {
    // Cerca il capitolo per nome
    return chapters.find(chapter => chapter.chapterName === input);
  } else if (typeof input === 'number') {
    // Cerca il capitolo per indice
    return chapters[input];
  }

  // Se l'input non corrisponde a stringa o numero, ritorna undefined o lancia un errore
  return undefined;
}