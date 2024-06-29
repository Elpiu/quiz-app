import {injectable} from "inversify";
import {BaseContainer} from "@/lib/core/container/BaseInteractiveContainer";
// Importa i tuoi file JSON
import assessmentTest from '../../../myData/dataJson/Assessment Test.json';
import chapter1 from '../../../myData/dataJson/Chapter 1.json';
import chapter2 from '../../../myData/dataJson/Chapter 2.json';
import chapter3 from '../../../myData/dataJson/Chapter 3.json';
import chapter4 from '../../../myData/dataJson/Chapter 4.json';
import chapter5 from '../../../myData/dataJson/Chapter 5.json';
import chapter6 from '../../../myData/dataJson/Chapter 6.json';
import chapter7 from '../../../myData/dataJson/Chapter 7.json';
import chapter8 from '../../../myData/dataJson/Chapter 8.json';
import chapter9 from '../../../myData/dataJson/Chapter 9.json';
import chapter10 from '../../../myData/dataJson/Chapter 10.json';
import chapter11 from '../../../myData/dataJson/Chapter 11.json';
import chapter12 from '../../../myData/dataJson/Chapter 12.json';


export interface IMainDataContainer {
  getNumberOfChapters(): number
  getChapter(input: number | string): Chapter | undefined
}

export type MainData = {
  chapters: Chapter[]
}

@injectable()
export class MainDataContainer extends BaseContainer<MainData> implements IMainDataContainer{

  _data!: MainData

  constructor() {
    let _mainData: MainData = {
      chapters: MainDataContainer._loadAllChapters()
    }
    super(_mainData);

    this._data = _mainData;
  }


  getChapter(input: number | string): Chapter | undefined {
    if (typeof input === 'string') {
      // Cerca il capitolo per nome
      return this._data.chapters.find(chapter => chapter.id.toString() === input);
    } else if (typeof input === 'number') {
      // Cerca il capitolo per indice
      return this._data.chapters[input];
    }

    // Se l'input non corrisponde a stringa o numero, ritorna undefined o lancia un errore
    return undefined;
  }

  getNumberOfChapters(): number {
    return this._data.chapters.length;
  }

  private static _loadAllChapters():  Chapter[] {
    return [
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
  }

}