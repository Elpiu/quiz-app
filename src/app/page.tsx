"use client"

import React, {useEffect, useState} from "react";
import Link from "next/link";
import {injectIQuestion, injectMainDataContainer} from "@/lib/config/ioc";
import {useContainer} from "../lib/core/hook/genericHookForBaseContainer";
import SimpleC from "@/app/components/simpleC";
import {QuestionContainer} from "@/lib/bean/impl/QuestionContainer";
import {MainDataContainer} from "@/lib/custom-container/MainDataContainer";

export default function Home() {

  //console.log("Home page Init...")
  //if (process.env.TRANSLATE){
  //  await transformData()
  //}
  //console.log("Finito")
  //let chapters = useCtxQuestionsContext()

  // @ts-ignore
  const { data, getChapter, getNumberOfChapters } = useContainer(MainDataContainer, injectMainDataContainer);


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>{getNumberOfChapters()}</h1>
      <h2>{data.name} ___ {data.n}</h2>
      <SimpleC></SimpleC>
      <button className="btn btn-secondary" onClick={increment}>Increment</button>
    </main>
  );
}

type CardChapterProps = {
  chapter: Chapter
}

function CardChapter({chapter}: Readonly<CardChapterProps>) {
  return <div className="stats bg-primary text-primary-content m-2 min-w-full">
    <div className="stat">
      <div className="stat-title">Chapter Name</div>
      <div className="stat-value">{chapter.chapterName}</div>
      <div className="stat-actions">
        <Link href={`pages/quiz/${chapter.id}`} passHref>
          <button className="btn btn-sm btn-success">Start Now</button>
        </Link>
      </div>
    </div>

    <div className="stat">
      <div className="stat-title">Number of Question</div>
      <div className="stat-value">{chapter.questions.length}</div>
    </div>
  </div>
}