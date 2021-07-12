import { QNames } from "../../../Abstracts/Queue/queuesNames";
import { INotification } from "../INotification";
import { User } from "../../User/User";

export class Email implements INotification {
  constructor(
    public queueName: QNames,
    public receiver: User,
    public message: string,
    public title?: string
  ) {}

  formatPayload() {
      return { 
          data: {
              title: this.title,
              message: this.message,
              email: this.receiver?.email
          }
      }
  }
}
