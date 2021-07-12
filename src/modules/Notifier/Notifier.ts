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
      const notificationArray: INotification[] = []
      const notifications = {
        [queueName]:notificationArray,
      }
      this.queue.consume(queueName); // may use prefetch here with each provider limit
      globalEventEmitter.on(
        queueName,
        async (notification: INotification, queueName: QNames) => {
          console.log({ notification }, `received from the queue: ${queueName}`);
          notifications[queueName].push(notification)
          setInterval(() =>{
            if(notifications[queueName].length > 0) this.notify(notifications[queueName]);
            notifications[queueName].length = 0;
          }, Number(process.env.TIME_TO_WAIT)|| 60000)
        }
      );
    }
  }
  notify(notifications: INotification[]) {
    console.log({notifications: JSON.stringify(notifications), length: notifications.length})
    const provider: IProvider | null = ProviderFactory(notifications[0]?.queueName);
    if (provider) { //may handle requests limit here or in each service.
      for (let i = 0; i < notifications.length; i += provider.requestsLimitPerMinute) { //handle requests limit here.
        provider.send(notifications.slice(i, i + provider.requestsLimitPerMinute));
      }
    }
  }
}
