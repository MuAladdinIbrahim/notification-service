import { INotification } from "../../modules/Notification/INotification";
import { IProvider } from "../../modules/Provider/IProvider";

export class Mailgun implements IProvider {
    private static instance: any = null;
    requestsLimitPerMinute = Number(process.env.MAILGUN_LIMIT) || 10
    private constructor() {}
    static getService() {
      if (!this.instance) this.instance = new Mailgun();
      return this.instance;
    }
    async send(msgs: INotification[]){
        return true
    }
}