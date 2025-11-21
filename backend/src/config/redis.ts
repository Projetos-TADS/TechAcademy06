import Redis from "ioredis";
import Logger from "./logger";

const redisConfig = {
  host: process.env.REDIS_HOST || "redis",
  port: Number(process.env.REDIS_PORT) || 6379,
};

const redisClient = new Redis(redisConfig);
const redisPub = new Redis(redisConfig);
const redisSub = new Redis(redisConfig);

redisClient.on("connect", () => {
  Logger.info("Redis Client (Cache) connected");
});

redisClient.on("error", (error) => {
  Logger.error("Redis Client Error:" + error);
});

redisPub.on("connect", () => {
  Logger.info("Redis Publisher connected");
});

redisPub.on("error", (error) => {
  Logger.error("Redis Publisher Error:" + error);
});

redisSub.on("connect", () => {
  Logger.info("Redis Subscriber connected");
});

redisSub.on("error", (error) => {
  Logger.error("Redis Subscriber Error:" + error);
});

export { redisClient, redisPub, redisSub };
export default redisClient;
