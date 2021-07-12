import { INotification } from "../Notification/INotification";
import { IProvider } from "./IProvider";

export class EmailProvider implements IProvider {
    public requestsLimitPerMinute: number
    //emailService may be mailgun, mailtrap, nodemailer or any other real provider
    constructor(private emailService: IProvider){
        this.requestsLimitPerMinute = emailService.requestsLimitPerMinute;
    }
    async send(msgs: INotification[]) {
        return this.emailService.send(msgs)
    }
}