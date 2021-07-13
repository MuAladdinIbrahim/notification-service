/*
    responsibilty of organizer, to consume data from "raw" queue,
    organize data based on their type (sms, email, push), build notification
    and publish them into suitable queue.
    >> may wait 1 minute before sending data into queue. (or make it at consumer by notifier)
*/

import { QNames } from "../../Abstracts/Queue/queuesNames";
import { IRepository } from "../../Abstracts/DataAccess/IRepository";
import { INotification } from "../Notification/INotification";
import IQueue from "../../Abstracts/Queue/IQueue";
import { NotificationFactory } from "../Notification/NotificationFactory";
import globalEventEmitter from "../../helpers/Event/globalEventEmitter";
import { RawNotification } from "../RawNotification/service";
import { User } from "../User/User";

export class Organizer {
  constructor(public queue: IQueue, public repository: IRepository) {}
  async allocateDataToQueues(from: QNames = QNames.RAW) {
    this.queue.consume(from);
    globalEventEmitter.on(from, async (rawNotification: RawNotification, queueName: QNames) => {
      // console.log({rawNotification }, `received from ${queueName}`);
      // user data
      for( let id of rawNotification.receiversIds) {
        const receiver: User | null = await User.getById(id, this.repository)
        if(receiver){
          const notification: INotification = NotificationFactory.create(receiver,rawNotification)
          const payload = notification.formatPayload()
          // May wait here for 1 min and hold payloads according to provider's policy before publishing
          this.queue.publish(notification.queueName, payload)
        }
      }      
    });

  }
}
