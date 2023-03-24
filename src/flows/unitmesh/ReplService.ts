import { Subject } from "rxjs";
import { WebSocketSubject } from "rxjs/internal/observable/dom/WebSocketSubject";

import { ReplResult } from "./ascode";

export class ReplService {
  private subject: WebSocketSubject<any>;
  private idSubjectMap: Record<number, Subject<any>> = {};
  private codes: Record<number, string> = {};
  private indexId = 0;
  private runningCodeIds: number[] = [];

  private runAllSub = new Subject();
  private isRunAll = false;

  constructor(subject: WebSocketSubject<any>) {
    this.subject = subject;

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    this.subject.subscribe({
      next: (msg: ReplResult) => {
        if (that.idSubjectMap[msg.id] != null) {
          const sub: Subject<any> = that.idSubjectMap[msg.id];
          sub.next(msg);
        }

        const isRunAll = that.runningCodeIds.length > 0;
        if (isRunAll) {
          that.runningCodeIds.forEach((item, index) => {
            if (item == msg.id) that.runningCodeIds.splice(index, 1);
          });

          if (that.isRunAll && that.runningCodeIds.length == 0) {
            that.isRunAll = false;
            that.runAllSub.next("done");
          }
        }
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.log("complete");
      },
    });
  }

  getSubject() {
    return this.subject;
  }

  register() {
    this.indexId += 1;
    const subject = new Subject<any>();
    this.idSubjectMap[this.indexId] = subject;
    return {
      id: this.indexId,
      subject,
    };
  }

  eval(code: string, id: number) {
    this.subject.next({ code: code, id: id });
  }
}
