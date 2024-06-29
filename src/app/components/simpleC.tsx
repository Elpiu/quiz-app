import {useContainer} from "../../lib/core/hook/genericHookForBaseContainer";
import {QuestionContainer} from "@/lib/bean/impl/QuestionContainer";
import {injectIQuestion, injectMainDataContainer} from "@/lib/config/ioc";
import {IMainDataContainer, MainData, MainDataContainer} from "@/lib/custom-container/MainDataContainer";


export default function SimpleC(){

  // @ts-ignore
  const { data, getChapter, getNumberOfChapters } = useContainer(MainDataContainer, injectMainDataContainer);


  return <div className="tooltip" data-tip={getChapter(3).chapterName}>
    <button className="btn">Hover me</button>
  </div>
}