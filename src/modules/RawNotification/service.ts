import { QNames } from "../../Abstracts/consts/queuesNames";
import IQueue from "../../Abstracts/Queue/IQueue";
import { NotificationType, NotificationSet } from "./type";
export class RawNotification {
  constructor(
    private type: NotificationType,
    private set: NotificationSet,
    private receiversIds: [string],
    private message: string,
    private title?: string
  ) {}
  async toBeSentToQueue(queueName: QNames, queue: IQueue) {
    try {
      queue.publish(queueName, this);
    } catch (err) {
      throw err;
    }
  }
}
