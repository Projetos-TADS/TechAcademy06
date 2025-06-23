import { DataTypes, Model } from "sequelize";
import { UserModel } from "./User.model";
import { MovieModel } from "./Movie.model";
import sequelize from "../config/database";
import { FavoriteMovieAttributes, FavoriteMovieCreationAttributes } from "../interfaces";

export class FavoriteMovieModel
  extends Model<FavoriteMovieAttributes, FavoriteMovieCreationAttributes>
  implements FavoriteMovieAttributes
{
  public favoriteMovieId!: string;
  public userId!: string;
  public movieId!: string;
  public addedDate!: Date;
}

FavoriteMovieModel.init(
  {
    favoriteMovieId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: UserModel,
        key: "userId",
      },
    },
    movieId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: MovieModel,
        key: "movieId",
      },
    },
    addedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "favorite_movies",
    timestamps: true,
  }
);

UserModel.belongsToMany(MovieModel, {
  through: FavoriteMovieModel,
  foreignKey: "userId",
  as: "favoriteMovies",
});

UserModel.hasMany(FavoriteMovieModel, {
  foreignKey: "userId",
  as: "favoriteList",
  onDelete: "CASCADE",
});

MovieModel.belongsToMany(UserModel, {
  through: FavoriteMovieModel,
  foreignKey: "movieId",
  as: "usersFavoriting",
});

MovieModel.hasMany(FavoriteMovieModel, {
  foreignKey: "movieId",
  as: "favoriteMovieEntries",
  onDelete: "CASCADE",
});

FavoriteMovieModel.belongsTo(MovieModel, {
  foreignKey: "movieId",
  as: "movie",
});
FavoriteMovieModel.belongsTo(UserModel, {
  foreignKey: "userId",
  as: "user",
});
