import dotenv from "dotenv";
import { QNames } from "./src/Abstracts/Queue/queuesNames";
import app from "./src/app"
import { Notifier } from "./src/modules/Notifier/Notifier";
import { Organizer } from "./src/modules/organizer/Organizer";

dotenv.config();

import { RabbitMQ } from "./src/service/RabbitMQ/RabbitMq";
import { Redis } from "./src/service/Redis/Redis";
const RMQ_URL: string = process.env.RMQ_URL || ""
const rabbitmq = new RabbitMQ(RMQ_URL)
const notifier = new Notifier(rabbitmq)
notifier.watch()
const redis = Redis.getInstance();
const org = new Organizer(rabbitmq, redis)
org.allocateDataToQueues()

const serverURL = process.env.SERVER_URL || "localhost";
const serverPort = process.env.SERVER_PORT || 3000;
app.listen(serverPort, () => {
  console.log(`server started at ${serverURL}:${serverPort}`);
});