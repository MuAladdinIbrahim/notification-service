import amqp from "amqplib";
import IQueue from "./../../Abstracts/Queue/IQueue";
import globalEventEmitter from "../../helpers/Event/globalEventEmitter"
import { QNames } from "../../Abstracts/Queue/queuesNames";
export class RabbitMQ implements IQueue {
  constructor(private amqpServer: string) {}

  private async connect() {
    const connection = await amqp
      .connect(this.amqpServer)
      .then((connection) => connection)
      .catch((err) => {
        throw err;
      });
    return connection;
  }

  async publish(queueName: QNames, msg: any) {
    try {
      const connection = await this.connect();
      await connection
        .createChannel()
        .then(async (channel) => {
          await channel.assertQueue(queueName);
          channel.sendToQueue(queueName, Buffer.from(JSON.stringify(msg)));
          // console.log(`${queueName} sent successfully ${JSON.stringify(msg)}`);
          await channel.close();
          await connection.close();
        })
        .catch((error) => {
          throw error;
        });
    } catch (err) {
      console.log({ err: err });
      throw err;
    }
  }

  async consume(queueName: QNames, options?:any ) {
    try {
      const connection = await this.connect();
      //TODO may channel be singleton according to use case.
      await connection
        .createChannel()
        .then(async (channel) => {
          await channel.assertQueue(queueName);
          if(options?.prefetch) channel.prefetch(options?.prefetch)
          channel.consume(queueName, (message: any) => {
            // console.log({content: message.content.toString()});
            const item = JSON.parse(message?.content?.toString());
            // console.log(`Recieved ${queueName} with input ${item}`);
            globalEventEmitter.emit(queueName, item, queueName)
            setTimeout(() => {channel.ack(message);}, Number(process.env.TIME_TO_WAIT)||60000)
          });
        })
        .catch((error) => {
          console.log({ error });
          throw error;
        });
      console.log(`Waiting for messages of ${queueName}...`);
    } catch (err) {
      console.log({ err: err });
      throw err;
    }
  }
}
