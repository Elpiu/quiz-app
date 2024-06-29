import { Container } from "inversify";
import {IProvaBean} from "@/lib/bean/interface/IProvaBean";
import "reflect-metadata";
import {HelloProva} from "@/lib/bean/impl/HelloProva";
import {QuestionContainer} from "@/lib/bean/impl/QuestionContainer";
import {IMainDataContainer, MainDataContainer} from "@/lib/custom-container/MainDataContainer";

export const types = {
  IProvaBean: Symbol('IProvaBean'),
  QuestionContainer: Symbol('QuestionContainer'),
  IMainDataContainer: Symbol('IMainDataContainer'),
}




export const container = new Container()



container.bind<IProvaBean>(types.IProvaBean).to(HelloProva)
container.bind<QuestionContainer>(types.QuestionContainer).to(QuestionContainer)
container.bind<IMainDataContainer>(types.IMainDataContainer).to(MainDataContainer)

console.log("Container ended injecting bean")

//Tokens
export const injectIQuestion = container.get<QuestionContainer>(types.QuestionContainer)
export const injectMainDataContainer = container.get<IMainDataContainer>(types.IMainDataContainer)