import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { MovieModel } from "./Movie.model";

export class MovieImageModel extends Model {
  public id!: number;
  public movieId!: string;
  public filename!: string;
  public path!: string;
}

MovieImageModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    movieId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "movies",
        key: "movieId",
      },
      onDelete: "CASCADE",
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "movie_images",
    timestamps: false,
  }
);

MovieModel.hasMany(MovieImageModel, { foreignKey: "movieId", as: "images" });
MovieImageModel.belongsTo(MovieModel, { foreignKey: "movieId", as: "movie" });
