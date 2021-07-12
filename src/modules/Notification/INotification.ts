import { User } from "../User/User";
import { QNames } from "../../Abstracts/Queue/queuesNames";

export interface INotification {
    queueName: QNames,
    receiver: User,
    message: string,
    title?: string,
    formatPayload(): string | Object
}