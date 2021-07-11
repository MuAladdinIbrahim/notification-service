export interface IRepository {
  set(key: string, value: any): Promise<any>;
  get(key: string): Promise<any>;
}
