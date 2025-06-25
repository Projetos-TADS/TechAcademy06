import app from "..";
import sequelize from "./database";

const PORT: number = Number(process.env.PORT || 3000);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to the database has been established successfully.");
    app.listen(PORT, "0.0.0.0", () => console.log("Server is running on port:", PORT));
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  });
