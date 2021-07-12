import { INotification } from "../../modules/Notification/INotification";
import { IProvider } from "../../modules/Provider/IProvider";

export class VodaSMS implements IProvider {
  private static instance: any = null;
  requestsLimitPerMinute = Number(process.env.VODA_LIMIt) || 10
  private constructor() {}
  static getService() {
    if (!this.instance) this.instance = new VodaSMS();
    return this.instance;
  }
  async send(msgs: INotification[]) {
    return true;
  }
}
