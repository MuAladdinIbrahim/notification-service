import { IRepository } from "../Abstracts/DataAccess/IRepository";
import { UserFields } from "../modules/User/type";

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

export const redisMock: IRepository = {
  set:  jest.fn(async (key,value) => usersData.set(key, value)),
  get: jest.fn(async (key) => usersData.get(key)),
  disconnect: jest.fn(),
};