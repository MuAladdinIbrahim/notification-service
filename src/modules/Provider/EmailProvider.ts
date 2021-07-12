import { IProvider } from "./IProvider";

export class EmailProvider implements IProvider {
    //emailService may be mailgun, mailtrap, nodemailer or any other real provider
    constructor(private emailService: IProvider){}
    async send(msgs: string[]) {
        return this.emailService.send(msgs)
    }
}