import { DataTypes, Model } from "sequelize";
import { MovieModel } from "./Movie.model";
import sequelize from "../config/database";
import { DirectorModel } from "./Director.model";
import { DirectorMovieAttributes, DirectorMovieCreationAttributes } from "../interfaces";

export class DirectorMovieModel
  extends Model<DirectorMovieAttributes, DirectorMovieCreationAttributes>
  implements DirectorMovieAttributes
{
  public directorMovieId!: string;
  public directorId!: string;
  public movieId!: string;
  public addedDate!: Date;
}

DirectorMovieModel.init(
  {
    directorMovieId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    directorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "directors",
        key: "directorId",
      },
    },
    movieId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "movies",
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
    tableName: "director_movie",
    modelName: "DirectorMovie",
    timestamps: true,
  }
);

DirectorModel.belongsToMany(MovieModel, {
  through: DirectorMovieModel,
  foreignKey: "directorId",
  otherKey: "movieId",
  as: "movies",
});

MovieModel.belongsToMany(DirectorModel, {
  through: DirectorMovieModel,
  foreignKey: "movieId",
  otherKey: "directorId",
  as: "directors",
});

DirectorModel.hasMany(DirectorMovieModel, {
  foreignKey: "directorId",
  as: "directorInstances",
});

MovieModel.hasMany(DirectorMovieModel, {
  foreignKey: "movieId",
  as: "directorMovieEntries",
});

DirectorMovieModel.belongsTo(MovieModel, {
  foreignKey: "movieId",
  as: "movie",
});

DirectorMovieModel.belongsTo(DirectorModel, {
  foreignKey: "directorId",
  as: "director",
});
