import { IRepository } from "../Abstracts/DataAccess/IRepository";
import IQueue from "../Abstracts/Queue/IQueue";
import { RawNotification } from "../modules/RawNotification/service";
import {
  NotificationSet,
  NotificationType,
} from "../modules/RawNotification/type";
import { UserFields } from "../modules/User/type";
import { User } from "../modules/User/User";

export const usersData = new Map<string, UserFields>();
usersData.set("1", {
  id: "1",
  name: "Muhammad",
  email: "mu@gmail.com",
  phoneNumber: "010123456789",
  token: "token",
});
usersData.set("2", {
  id: "2",
  name: "Ibrahim",
  email: "irahim@gmail.com",
  phoneNumber: "011123456789",
  token: "token",
});
usersData.set("3", {
  id: "3",
  name: "Ayoub",
  email: "ayoub@gmail.com",
  phoneNumber: "012123456789",
  token: "token",
});

export const rawSMS: RawNotification = new RawNotification(
  NotificationType.SMS,
  NotificationSet.Personalized,
  ["1"],
  "hi"
);
export const rawEmail: RawNotification = new RawNotification(
  NotificationType.Email,
  NotificationSet.Personalized,
  ["1"],
  "hi"
);
export const rawPush: RawNotification = new RawNotification(
  NotificationType.Push,
  NotificationSet.Personalized,
  ["1"],
  "hi"
);
