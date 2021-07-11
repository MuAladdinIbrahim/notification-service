export default interface IQueue {
    publish(queueName: string, msg: any): void;
    consume(queueName: string): void;
}