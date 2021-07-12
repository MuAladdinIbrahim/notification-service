import { IRepository } from "../../Abstracts/DataAccess/IRepository";
import { Redis } from "../../service/Redis/Redis";
import { UserRepository } from "./Repository";
import { UserFields } from "./type";

export class User {
  constructor(
    public id: string,
    public name: string,
    public email?: string,
    public phoneNumber?: string,
    public token?: string
  ) {}
  private static getUsersData(ids: string[]): Map<string, UserFields> {
    // according to use-case
    // may get data from an end point or DB.
    // in case of an end point, save data into Redis to be easily accessible
    // should return map or object. {id: {name,email,phoneNumber,token}}
    const usersData = new Map<string, UserFields>();
    usersData.set("1", {
      id: "1",
      name: "Muhammad",
      email: "mu@gmail.com",
      phoneNumber: "",
      token: "",
    });
    usersData.set("2", {
      id: "2",
      name: "Muhammad",
      email: "mu@gmail.com",
      phoneNumber: "",
      token: "",
    });
    usersData.set("3", {
      id: "3",
      name: "Muhammad",
      email: "mu@gmail.com",
      phoneNumber: "",
      token: "",
    });
    return usersData;
  }
  static async saveUsersData(
    ids: string[],
    repository: IRepository
  ): Promise<boolean> {
    try {
      const userRepo = new UserRepository(repository);
      const usersData: Map<string, UserFields> = this.getUsersData(ids);
      for (let id of ids) {
        userRepo.set(id, usersData.get(id));
      }
      return true;
    } catch (error) {
      throw error;
    }
  }

  static async getById(id: string, repository: IRepository): Promise<User> {
    const userRepo = new UserRepository(repository);
    const userFields: UserFields = await userRepo.get(id);
    const { id: userId, name, email, phoneNumber, token } = userFields;
    return new User(userId, name, email, phoneNumber, token);
  }
}
