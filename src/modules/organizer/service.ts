/*
    responsibilty of organizer, to consume data from "raw" queue,
    organize data based on their type (sms, email, push), build notification
    and publish them into suitable queue.
    >> may wait 1 minute before sending data into queue. (or make it at consumer by notifier)
*/

import { QNames } from "../../Abstracts/consts/queuesNames";
import IQueue from "../../Abstracts/Queue/IQueue";
import globalEventEmitter from "../../helpers/Event/globalEventEmitter";

export class Organizer {
  constructor(public queue: IQueue) {}
  syncDataBetweenQueues(from: QNames, to: string) {
    this.queue.consume(from);
    globalEventEmitter.on(from, (item: any, queueName: QNames) => {
      console.log({ item }, `received from ${queueName}`);
    });

  }
}
