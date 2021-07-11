import { IRepository } from "../../Abstracts/DataAccess/IRepository";
import { Redis } from "../../service/Redis/Redis";
import { UserRepository } from "./Repository";

export class User {
  constructor() {}
  private static getUsersData(ids: string[]): Map<string, Object> {
    // according to use-case
    // may get data from an end point or DB.
    // in case of an end point, save data into Redis to be easily accessible
    // should return map or object. {id: {name,email,phoneNo,token}}
    const usersData = new Map();
    usersData.set("1", {
      name: "Muhammad",
      email: "mu@gmail.com",
      phoneNo: "",
      token: "",
    });
    usersData.set("2", {
      name: "Muhammad",
      email: "mu@gmail.com",
      phoneNo: "",
      token: "",
    });
    usersData.set("3", {
      name: "Muhammad",
      email: "mu@gmail.com",
      phoneNo: "",
      token: "",
    });
    return usersData;
  }
  static async saveUsersData(ids: string[]): Promise<boolean> {
    try {
      const redis: IRepository = Redis.getInstance()
      const userRepo = new UserRepository(redis)
      const usersData: Map<string,Object> = this.getUsersData(ids)
      for (let id of ids) {
        userRepo.set(id,usersData.get(id))
      }
      return true;
    } catch (error) {
      throw error;
    }
  }
}
