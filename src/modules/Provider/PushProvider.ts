import { INotification } from "../Notification/INotification";
import { IProvider } from "./IProvider";

export class PushProvider implements IProvider {
    public requestsLimitPerMinute: number
    //pushService may be firebase, huawei, clevertap or any other real provider or service
    constructor(private pushService: IProvider){
        this.requestsLimitPerMinute = pushService.requestsLimitPerMinute;
    }
    async send(msgs: INotification[]) {
        return this.pushService.send(msgs)
    }
}