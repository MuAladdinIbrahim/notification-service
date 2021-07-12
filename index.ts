import dotenv from "dotenv";
import { QNames } from "./src/Abstracts/Queue/queuesNames";
import app from "./src/app"
import globalEventEmitter from "./src/helpers/Event/globalEventEmitter";
import { Organizer } from "./src/modules/organizer/Organizer";
import { NotificationType } from "./src/modules/RawNotification/type";

dotenv.config();

import { RabbitMQ } from "./src/service/RabbitMQ/RabbitMq";
import { Redis } from "./src/service/Redis/Redis";
const RMQ_URL: string = process.env.RMQ_URL || ""
const rabbitmq = new RabbitMQ(RMQ_URL)
rabbitmq.consume(QNames.RAW)
rabbitmq.consume(QNames.EMAIL)
rabbitmq.consume(QNames.PUSH)
rabbitmq.consume(QNames.SMS)
const redis = Redis.getInstance();
const org = new Organizer(rabbitmq, redis)
org.syncDataBetweenQueues(QNames.RAW)

const serverURL = process.env.SERVER_URL || "localhost";
const serverPort = process.env.SERVER_PORT || 3000;
app.listen(serverPort, () => {
  console.log(`server started at ${serverURL}:${serverPort}`);
});