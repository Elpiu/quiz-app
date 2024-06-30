"use client"


import Link from "next/link";
import {useContainer} from "@/lib/core/hook/genericHookForBaseContainer";
import {MainDataContainer} from "@/lib/custom-container/MainDataContainer";
import {injectMainDataContainer} from "@/lib/config/ioc";

export default function Navbar() {

  const { getAllChapter } = useContainer(MainDataContainer, injectMainDataContainer);

  return <div className="navbar bg-primary text-primary-content">
    <div className="flex-1">
      <Link href={"/"} className="btn btn-ghost text-xl">AWS Certified Cloud Practitioner Certification</Link>
    </div>
    <div className="flex-none">

      <ul className="menu menu-horizontal px-1">
        <li>
          <details>
            <summary>Chapters</summary>
            <ul className="bg-base-100 rounded-t-none p-2">
              {getAllChapter().map((chapter: Chapter, index: number) => (
                <li key={index+chapter.chapterName}><Link href={"/pages/quiz/"+chapter.id} >{chapter.chapterName}</Link></li>
              ))}


            </ul>
          </details>
        </li>
      </ul>

    </div>
  </div>
}