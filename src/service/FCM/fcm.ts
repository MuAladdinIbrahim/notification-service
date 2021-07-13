import { INotification } from "../../modules/Notification/INotification";
import { IProvider } from "../../modules/Provider/IProvider";

export class FCM implements IProvider {
    private static instance: any = null;
    requestsLimitPerMinute = Number(process.env.FCM_LIMIT) || 10
    private constructor() {}
    static getService() {
      if (!this.instance) this.instance = new FCM();
      return this.instance;
    }
    async send(msgs: INotification[]){
      console.log(`from fcm service,received ${msgs.length} msgs which are ${msgs} and will be sent`)
        return true
    }
}