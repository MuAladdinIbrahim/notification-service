import { INotification } from "../Notification/INotification";
import { IProvider } from "./IProvider";

export class SMSProvider implements IProvider {
    //smsService may be vodafone, orange or any other real provider
    public requestsLimitPerMinute: number
    constructor(private smsService: IProvider){
        this.requestsLimitPerMinute = smsService.requestsLimitPerMinute
    }
    async send(msgs: INotification[]) {
        return this.smsService.send(msgs)
    }
}