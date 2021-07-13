import { promisify } from "util";
import redis from "redis";
import { IRepository } from "../../Abstracts/DataAccess/IRepository";

export class Redis implements IRepository {
  private redisClient: redis.RedisClient;
  private setAsync: any;
  private getAsync: any;
  private static instance: Redis;
  private constructor() {
    this.redisClient = redis.createClient({
      port: Number(process.env.REDIS_PORT),
      host: process.env.REDIS_HOST,
      password: process.env.REDIS_PASS,
      retry_strategy: function (options) {
        if (options.error && options.error.code === "ECONNREFUSED") {
          return new Error("The server refused the connection");
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
          return new Error("Retry time exhausted");
        }
        if (options.attempt > 10) {
          return undefined;
        }
        // reconnect after
        return Math.min(options.attempt * 100, 3000);
      },
    });
    this.setAsync = promisify(this.redisClient.set).bind(this.redisClient);
    this.getAsync = promisify(this.redisClient.get).bind(this.redisClient);
  }

  async set(key: string, value: string) {
    return await this.setAsync(key, JSON.stringify(value))
      .then((data: any) => data)
      .catch((err: Error) => {
        throw err;
      });
  }
  async get(key: string) {
    const data = await this.getAsync(key)
      .then((data: any) => data)
      .catch((err: Error) => console.log(`error getting from Redis ${err}`));
    return JSON.parse(data);
  }

  public static getInstance() {
    if (!this.instance) this.instance = new Redis();
    return this.instance;
  }
  disconnect() {
    this.redisClient.quit()
  }
}
