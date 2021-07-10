import { RabbitMQ } from "../../service/RabbitMQ/RabbitMq";
import { NotificationType, NotificationSet } from "./type";
export class RawNotification {
  constructor(
    private type: NotificationType,
    private set: NotificationSet,
    private receiversIds: [string],
    private message: string,
    private title?: string
  ) {}
  async toBeSentToQueue(queueName: string, rabbitMQ: RabbitMQ) {
    try {
      rabbitMQ.publish(queueName, this);
    } catch (err) {
      throw err;
    }
  }
}
