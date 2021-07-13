import { NotificationFactory } from "../../modules/Notification/NotificationFactory";
import { Email } from "../../modules/Notification/Email/Email";
import { SMS } from "../../modules/Notification/SMS/SMS";
import { PushNotification } from "../../modules/Notification/PushNotification/PushNotification";
import { rawEmail, rawPush, rawSMS } from "../../data/setup-data-for-tests";
import { User } from "../../modules/User/User";

describe("Notification Factory, should create a notification based on user and rawNotification", () => {
  const createMock = jest.fn(NotificationFactory.create);
  const receiver: User = new User(
    "1",
    "zohdy",
    "zohdy@gmail.com",
    "011123456789",
    "token"
  );
  it("email raw notification => Email instance", () => {
    const email = createMock(receiver, rawEmail);
    expect(email).toMatchObject(
      new Email(email.queueName, email.receiver, email.message, email.title)
    );
  });
  it("sms raw notification => SMS instance", () => {
    const sms = createMock(receiver, rawSMS);
    expect(sms).toMatchObject(
        new SMS(sms.queueName, sms.receiver, sms.message)
      );
  });

  it("push raw notification => PushNotification instance", () => {
    const push = createMock(receiver, rawPush);
    expect(push).toMatchObject(
        new PushNotification(push.queueName, push.receiver, push.message)
      );
  });
});
