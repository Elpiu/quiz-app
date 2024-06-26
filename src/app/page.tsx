"use client"

import {transformData} from "@/lib/converter/txtToJson";
import {useCtxQuestionsContext, useCtxQuestionsContextForGetChapter} from "../../context/CtxQuestions";

export default function Home() {

  //console.log("Home page Init...")
  //if (process.env.TRANSLATE){
  //  await transformData()
  //}
  //console.log("Finito")
  let chapters = useCtxQuestionsContext()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {chapters.map((chapter, index) => (
        <CardChapter chapter={chapter}></CardChapter>
      ))}

      <input type="range" min={0} max="100" value="40" className="range"/>
    </main>
  );
}


function CardChapter({chapter}) {
  return <div className="stats bg-primary text-primary-content">
    <div className="stat">
      <div className="stat-title">Chapter Name</div>
      <div className="stat-value">{chapter.chapterName}</div>
      <div className="stat-actions">
        <button className="btn btn-sm btn-success">Start Now</button>
      </div>
    </div>

    <div className="stat">
      <div className="stat-title">Number of Question</div>
      <div className="stat-value">{chapter.questions.length}</div>
      <div className="stat-actions">
        <button className="btn btn-sm">Withdrawal</button>
        <button className="btn btn-sm">Deposit</button>
      </div>
    </div>
  </div>
}