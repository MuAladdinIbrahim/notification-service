import amqp from "amqplib";

export class RabbitMQ {
  constructor(private amqpServer: string) {}

  private async connect() {
    const connection = await amqp.connect(this.amqpServer);    
    return connection;
  }

  async publish(queueName: string, msg: any) {
    try {
      const connection = await this.connect();
      const channel = await connection.createChannel();
      await channel.assertQueue(queueName);
      channel.sendToQueue(queueName, Buffer.from(JSON.stringify(msg)));
      console.log(`${queueName} sent successfully ${msg}`);
      await channel.close();
      await connection.close();
    } catch (err) {
      console.log({ err: err });
      throw err;
    }
  }

  async consume(queueName: string) {
    try {
      const connection = await this.connect();
      //TODO may channel be singleton according to use case. 
      const channel = await connection.createChannel();
      await channel.assertQueue(queueName);
      channel.consume(queueName, (message: any) => {
        const item = JSON.parse(message.content.toString());
        console.log(`Recieved ${queueName} with input ${item}`);
        channel.ack(message);
        //TODO can emit an event here as a new item is consumed.
        //event handler receives it and build the notification
      });
      console.log("Waiting for messages...");
      
    } catch (err) {
      console.log({ err: err });
      throw err;
    }
  }
}