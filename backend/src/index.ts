import "express-async-errors";
import express, { Application } from "express";
import { setupSwagger } from "./config/swagger";
import routes from "./routes/";
import middlewares from "./middlewares";
import cors, { CorsOptions } from "cors";
import path from "path";

const app: Application = express();

const corsOptions: CorsOptions = {
  origin: ["http://localhost:5173", "https://blockbuster.local"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")));
app.use("/v1/users", routes.userRoutes);
app.use("/v1/login", routes.sessionRoutes);
app.use("/v1/movies", routes.movieRoutes);
app.use("/v1/favorites", routes.favoriteRoutes);
app.use("/v1/actors", routes.actorRoutes);
app.use("/v1/directors", routes.directorRoutes);
app.use("/v1/cast", routes.castRoutes);
app.use("/v1/directorMovie", routes.directorMovieRoutes);

app.use(middlewares.handleError);

setupSwagger(app);

export default app;
