import "express-async-errors";
import express, { Application, json } from "express";
import cors, { CorsOptions } from "cors";
import path from "path";
import fs from "fs";
import routes from "./routes";
import handleError from "./middlewares/handleError.middleware";

const app: Application = express();

const corsOptions: CorsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://blockbuster.local",
    "https://localhost",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(json());

const uploadsPath = path.resolve(__dirname, "../uploads");

if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

app.use("/uploads", express.static(uploadsPath));

app.use("/v1", routes);

app.use(handleError);

export default app;
