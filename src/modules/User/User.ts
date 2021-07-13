import { IRepository } from "../../Abstracts/DataAccess/IRepository";
import { Redis } from "../../service/Redis/Redis";
import { usersData } from "../../data/setup-data-for-tests";
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
    const userFields = new Map<string, UserFields>();
    for (const id of ids) {
      const userData = usersData.get(id);
      if (userData) userFields.set(id, userData);
    }
    return userFields;
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

  static async getById(
    id: string,
    repository: IRepository
  ): Promise<User | null> {
    const userRepo = new UserRepository(repository);
    const userFields: UserFields = await userRepo.get(id);
    if (!userFields) return null;
    const { id: userId, name, email, phoneNumber, token } = userFields;
    return new User(userId, name, email, phoneNumber, token);
  }
}
