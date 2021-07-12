import { QNames } from "../../../Abstracts/Queue/queuesNames";
import { IRepository } from "../../../Abstracts/DataAccess/IRepository";
import { RabbitMQ } from "../../../service/RabbitMQ/RabbitMq";
import { Redis } from "../../../service/Redis/Redis";
import { User } from "../../User/User";
import { RawNotification } from "../service";
import { NotificationSet } from "../type";

export const rawNotificationReqHandler = async ({
  type,
  set,
  receiversIds,
  message,
  title,
}: any) => {
  try {
    if(receiversIds?.length > 0) set = NotificationSet.Group
    else set = NotificationSet.Personalized
    const rawNotification = new RawNotification(
      type,
      set,
      receiversIds,
      message,
      title
    );
    const RMQ_URL: string = process.env.RMQ_URL || "amqp://localhost:5672";
    const rabbitMQ = new RabbitMQ(RMQ_URL);
    // we can ignore sending raw data to be saved in RabbitMQ queue
    // and save them into DB.
    await rawNotification
      .toBeSentToQueue(QNames.RAW, rabbitMQ)
      .then()
      .catch((error: any) => {
        throw error;
      });
    const redis: IRepository = Redis.getInstance();
    await User.saveUsersData(receiversIds, redis)
      .then()
      .catch((error: any) => {
        throw error;
      });
  } catch (error) {
    throw error;
  }
};
