import { QNames } from "../../Abstracts/Queue/queuesNames";
import { FCM } from "../../service/FCM/fcm";
import { Mailgun } from "../../service/MAILGUN/mailgun";
import { VodaSMS } from "../../service/VODA_SMS/vodaSMS";
import { EmailProvider } from "./EmailProvider";
import { IProvider } from "./IProvider";
import { PushProvider } from "./PushProvider";
import { SMSProvider } from "./SMSProvider";

export const ProviderFactory = (queueName: QNames): IProvider | null => {
  switch (queueName) {
    case QNames.SMS:
      return new SMSProvider(VodaSMS.getService());
    case QNames.EMAIL:
      return new EmailProvider(Mailgun.getService());
    case QNames.PUSH:
      return new PushProvider(FCM.getService());
    default:
      return null;
  }
};
