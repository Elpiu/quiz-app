import {IQuestionContainer} from "@/lib/bean/interface/IQuestionContainer";
import {injectable} from "inversify";
import {BaseContainer} from "@/lib/core/container/BaseInteractiveContainer";



export interface Dummy  {n: number, name: string}

@injectable()
export class QuestionContainer extends BaseContainer<Dummy> implements IQuestionContainer<Dummy> {
  private _numberOfChapters: number = 13;

  constructor() {
    let dummy = { n: 10, name: "Bello Figo" }
    super(dummy);
  }

  getNumberOfChapters(): number {
    return this._numberOfChapters;
  }

  increment(): void {
    const currentData = this.getCurrentValue();
    this.updateData({ ...currentData, n: currentData.n + 1 });
  }
}