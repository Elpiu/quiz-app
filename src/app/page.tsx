"use client"

import React from "react";
import Link from "next/link";
import {injectMainDataContainer} from "@/lib/config/ioc";
import {useContainer} from "../lib/core/hook/genericHookForBaseContainer";
import {MainDataContainer} from "@/lib/custom-container/MainDataContainer";


export default function Home() {

  const { getAllChapter } = useContainer<MainDataContainer, any>(MainDataContainer, injectMainDataContainer);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className="flex flex-wrap items-center justify-center gap-5 pb-5">
        <div className="card card-side bg-base-100 shadow-xl ">
          <figure>
            <img
              src="aws_cloud_partictioner.png"
              alt="Movie"/>
          </figure>
          <div className="card-body">
            <h2 className="card-title">📝 Random 60 question</h2>
            <p>Simulates the real exam, but the context of the question are taken randomly</p>
            <div className="card-actions justify-end">
              <Link className="btn btn-primary" href="/pages/randQuiz">Start now!</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="py-5 prose">
        <hr/>
        <h1>Or Select a Chapter</h1>
        <hr/>
      </div>

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