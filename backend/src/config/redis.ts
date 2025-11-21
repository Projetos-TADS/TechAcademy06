import Redis from "ioredis";

const redisClient = new Redis({
  host: process.env.REDIS_HOST || "redis",
  port: Number(process.env.REDIS_PORT) || 6379,
});

redisClient.on("connect", () => {
  console.log("Redis connected successfully");
});

redisClient.on("error", (error) => {
  console.error("Redis connection error:", error);
});

export default redisClient;
