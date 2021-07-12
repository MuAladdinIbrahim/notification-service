import IQueue from "../../Abstracts/Queue/IQueue";
import { QNames } from "../../Abstracts/Queue/queuesNames";
import globalEventEmitter from "../../helpers/Event/globalEventEmitter";
import { INotification } from "../Notification/INotification";

export class Notifier {
  constructor(public queue: IQueue) {}

  watch() {
    //consume first
    for (const queueName of Object.values(QNames)) {
      this.queue.consume(queueName); // may use prefetch here with each provider limit
      globalEventEmitter.on(
        queueName,
        async (notification: INotification, queueName: QNames) => {
          console.log({ notification }, `received from ${queueName}`);
        }
      );
    }
  }
  notify() {}
}
