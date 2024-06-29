import {BehaviorSubject, Observable} from "rxjs";
import {injectable, unmanaged} from "inversify";



export interface InteractiveContainer<T> {
  updateData(data: T): void;
  asObservable(): Observable<T>;
  getCurrentValue(): T
}

@injectable()
export class BaseContainer<T> implements InteractiveContainer<T> {
  private subject: BehaviorSubject<T>;

  constructor(@unmanaged() initialData: T) {
    this.subject = new BehaviorSubject<T>(initialData);
  }

  public updateData(data: T) {
    this.subject.next(data);
  }

  public asObservable(): Observable<T> {
    return this.subject.asObservable();
  }

  public getCurrentValue(): T {
    return this.subject.getValue();
  }
}