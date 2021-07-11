import { QNames } from "../../../Abstracts/consts/queuesNames";
import { RabbitMQ } from "../../../service/RabbitMQ/RabbitMq";
import { User } from "../../User/service";
import { RawNotification } from "../service";

export const rawNotificationReqHandler = async ({
  type,
  set,
  receiversIds,
  message,
  title,
}: any) => {
  try {
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
    await User.saveUsersData(receiversIds)
      .then()
      .catch((error: any) => {
        throw error;
      });
  } catch (error) {
    throw error;
  }
};
