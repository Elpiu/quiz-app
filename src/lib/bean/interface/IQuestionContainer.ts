import {InteractiveContainer} from "@/lib/core/container/BaseInteractiveContainer";

export interface IQuestionContainer<T> extends InteractiveContainer<T> {
  getNumberOfChapters(): number;
  increment(): void;
}