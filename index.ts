import dotenv from "dotenv";
import app from "./src/app"
import { RabbitMQ } from "./src/service/RabbitMQ/RabbitMq";

dotenv.config();

const RMQ_URL: string = process.env.RMQ_URL 
const rabbitmq = new RabbitMQ(RMQ_URL)
rabbitmq.publish("raw", "hi")
rabbitmq.consume("raw")

const serverURL = process.env.SERVER_URL || "localhost";
const serverPort = process.env.SERVER_PORT || 3000;
app.listen(serverPort, () => {
  console.log(`server started at ${serverURL}:${serverPort}`);
});