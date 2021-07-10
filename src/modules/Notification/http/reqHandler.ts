import { RabbitMQ } from "../../../service/RabbitMQ/RabbitMq";
import { RawNotification } from "../service";

export const rawNotificationReqHandler = ({
  type,
  set,
  receiversIds,
  message,
  title,
}: any) => {
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
  rawNotification.toBeSentToQueue("raw", rabbitMQ);
};
