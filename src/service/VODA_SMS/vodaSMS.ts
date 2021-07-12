import { IProvider } from "../../modules/Provider/IProvider";

export class VodaSMS implements IProvider {
    async send(msgs: string[]){
        return true
    }
}