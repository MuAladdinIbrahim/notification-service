import { promisify } from "util";
import redis from "redis";

export class Redis {
  private redisClient: redis.RedisClient;
  public set: any;
  public get: any;
  private static instance: Redis
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
    this.set = promisify(this.redisClient.set).bind(this.redisClient);
    this.get = promisify(this.redisClient.get).bind(this.redisClient);
  }

  public static getInstance() {
      if(!this.instance) this.instance = new Redis();
      return this.instance;
  }
}
