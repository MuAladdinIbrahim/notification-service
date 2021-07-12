import { QNames } from "../../Abstracts/Queue/queuesNames";
import IQueue from "../../Abstracts/Queue/IQueue";
import { NotificationType, NotificationSet } from "./type";
export class RawNotification {
  constructor(
    public type: NotificationType,
    public set: NotificationSet,
    public receiversIds: [string],
    public message: string,
    public title?: string
  ) {}
  async toBeSentToQueue(queueName: QNames, queue: IQueue) {
    try {
      queue.publish(queueName, this);
    } catch (err) {
      throw err;
    }
  }
}
