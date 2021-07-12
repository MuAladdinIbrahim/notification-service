import { IProvider } from "./IProvider";

export class SMSProvider implements IProvider {
    //smsService may be vodafone, orange or any other real provider
    constructor(private smsService: IProvider){}
    async send(msgs: string[]) {
        return this.smsService.send(msgs)
    }
}