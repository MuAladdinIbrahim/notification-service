import { QNames } from "../consts/queuesNames";

export default interface IQueue {
    publish(queueName: QNames, msg: any): void;
    consume(queueName: QNames): void;
}