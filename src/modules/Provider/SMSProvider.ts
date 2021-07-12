import { IProvider } from "./IProvider";

export class PushProvider implements IProvider {
    //pushService may be firebase, huawei, clevertap or any other real provider or service
    constructor(private pushService: IProvider){}
    async send(msgs: string[]) {
        return this.pushService.send(msgs)
    }
}