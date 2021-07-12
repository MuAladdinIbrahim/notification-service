import { QNames } from "../../Abstracts/Queue/queuesNames";
import { INotification } from "./INotification";
import { Email } from "./Email/Email";
import { PushNotification } from "./PushNotification/PushNotification";
import { SMS } from "./SMS/SMS";
import { RawNotification } from "../RawNotification/service";
import { NotificationType } from "../RawNotification/type";
import { User } from "../User/User";

export class NotificationFactory {
    constructor() {}
    public static create(receiver: User, rawNotification: RawNotification): INotification {
        const type = rawNotification.type;
        switch (type) {
            case NotificationType.Email:
                return new Email(QNames.EMAIL, receiver,rawNotification.message)
            case NotificationType.SMS:
                return new SMS(QNames.SMS, receiver,rawNotification.message)
            case NotificationType.Push:
                return new PushNotification(QNames.PUSH ,receiver,rawNotification.message)
            default:
                throw new Error(`${type} is not supported, ${Object.values(NotificationType)} are the supported types.`)
        }
    }
    
}