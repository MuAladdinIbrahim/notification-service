import { IProvider } from "../../modules/Provider/IProvider";

export class fcm implements IProvider {
    async send(msgs: string[]){
        return true
    }
}