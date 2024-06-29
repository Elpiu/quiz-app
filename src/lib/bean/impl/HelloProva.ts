import {injectable} from "inversify";
import {IProvaBean} from "@/lib/bean/interface/IProvaBean";

@injectable()
export class HelloProva implements IProvaBean {
  getString(): string {
    return "HelloProva--------------BEAN";
  }

}