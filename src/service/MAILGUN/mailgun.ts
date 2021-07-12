import { IProvider } from "../../modules/Provider/IProvider";

export class Mailgun implements IProvider {
    async send(msgs: string[]){
        return true
    }
}