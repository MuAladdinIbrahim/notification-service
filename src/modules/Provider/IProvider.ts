import { INotification } from "../Notification/INotification";

export interface IProvider {
    requestsLimitPerMinute: number;
    send(msgs: INotification[]): Promise<boolean|INotification[]>
}