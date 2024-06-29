"use client"

import React from "react";
import Link from "next/link";
import {injectIQuestion, injectMainDataContainer} from "@/lib/config/ioc";
import {useContainer} from "../lib/core/hook/genericHookForBaseContainer";
import {MainDataContainer} from "@/lib/custom-container/MainDataContainer";

export default function Home() {

  const { getAllChapter, getNumberOfChapters } = useContainer(MainDataContainer, injectMainDataContainer);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>We Bello Stai nella Home</h1>
      {getAllChapter().map((chapter: Chapter, index: number) => (
        <CardChapter key={index} chapter={chapter}></CardChapter>
      ))}
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