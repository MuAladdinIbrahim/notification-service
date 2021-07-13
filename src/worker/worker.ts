import IQueue from "../Abstracts/Queue/IQueue";
import { Notifier } from "../modules/Notifier/Notifier";
import { Organizer } from "../modules/organizer/Organizer";
import { RabbitMQ } from "../service/RabbitMQ/RabbitMq";
import { Redis } from "../service/Redis/Redis";

export class Worker {
    private rabbitMQ: IQueue = new RabbitMQ(process.env.RMQ_URL || "amqp://localhost:5672");
    private redis: any = Redis.getInstance();
    private notifier: Notifier = new Notifier(this.rabbitMQ)
    private org = new Organizer(this.rabbitMQ, this.redis);
    constructor(){}
    performNotifierWatch() {
        this.notifier.watch();
    }
    performOrganizerAllocation() {
        this.org.allocateDataToQueues();
    }
}