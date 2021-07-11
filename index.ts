import dotenv from "dotenv";
import { QNames } from "./src/Abstracts/consts/queuesNames";
import app from "./src/app"
import globalEventEmitter from "./src/helpers/Event/globalEventEmitter";

dotenv.config();

import { RabbitMQ } from "./src/service/RabbitMQ/RabbitMq";
import { Redis } from "./src/service/Redis/Redis";
const RMQ_URL: string = process.env.RMQ_URL || ""
const rabbitmq = new RabbitMQ(RMQ_URL)
rabbitmq.consume(QNames.RAW)

const redis = Redis.getInstance();
redis.get("1").then((data: any) =>{
  console.log({data, t:typeof data})
})
const serverURL = process.env.SERVER_URL || "localhost";
const serverPort = process.env.SERVER_PORT || 3000;
app.listen(serverPort, () => {
  console.log(`server started at ${serverURL}:${serverPort}`);
});