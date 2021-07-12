import { QNames } from "../../../Abstracts/Queue/queuesNames";
import { INotification } from "../INotification";
import { User } from "../../User/User";

export class SMS implements INotification {
  constructor(
    public queueName: QNames,
    public receiver: User,
    public message: string,
  ) {}

  formatPayload() {
      return { 
          data: {
              message: this.message,
              phoneNumber: this.receiver?.phoneNumber
          }
      }
  }
}
