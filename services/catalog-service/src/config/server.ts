import "dotenv/config";
import app from "../index";
import sequelize from "./database";
import Logger from "./logger";

const PORT: number = Number(process.env.PORT) || 3000;

sequelize
  .authenticate()
  .then(() => {
    Logger.info("Connection to the database has been established successfully.");
    app.listen(PORT, "0.0.0.0", () => {
      Logger.info(`Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    Logger.error(`Failed to connect to the database: ${error}`);
    process.exit(1);
  });
