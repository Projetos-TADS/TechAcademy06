import { redisSub } from "../config/redis";
import Logger from "../config/logger";

export const initSubscriber = () => {
  Logger.info("Initializing Redis Subscriber Service...");

  redisSub.subscribe("movie-channel", (err, count) => {
    if (err) {
      Logger.error("Failed to subscribe: " + err.message);
    } else {
      Logger.info(`Subscribed successfully to ${count} channel(s). Listening for events...`);
    }
  });

  redisSub.on("message", (channel, message) => {
    Logger.info(`[EVENT RECEIVED] Channel: ${channel} - Message: ${message}`);
  });
};
