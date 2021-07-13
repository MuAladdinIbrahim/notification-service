import IQueue from "../../Abstracts/Queue/IQueue";
import { QNames } from "../../Abstracts/Queue/queuesNames";
import globalEventEmitter from "../../helpers/Event/globalEventEmitter";
import { INotification } from "../Notification/INotification";
import { IProvider } from "../Provider/IProvider";
import { ProviderFactory } from "../Provider/ProviderFactory";

export class Notifier {
  constructor(public queue: IQueue) {}

  watch() {
    for (const queueName of Object.values(QNames)) {
      if(queueName == QNames.RAW) continue; // as raw is consumed before and its messages assigned to the rest of queues.
      const provider: IProvider | null = ProviderFactory(queueName);
      // const notifications = {
      //   [queueName]:[],
      // }
      // const notificationsArr: INotification[] = notifications[queueName]
      this.queue.consume(queueName, {prefetch: provider?.requestsLimitPerMinute});
      globalEventEmitter.on(
        queueName,
        (notification: INotification, queueName: QNames) => {
          // console.log({ notification }, `received from the queue is: ${queueName}`);
          // notificationsArr.push(notification);
          provider?.send([notification])

          /*TODO most of services accepts one message in an http request, so sending
                 notifications separately not affect this type
                 but some services like firebase accepts list of messages to be sent so it'll
                 be good if implement sending []notifications and service handle it.*/
        }
      );
    }
  }
}
