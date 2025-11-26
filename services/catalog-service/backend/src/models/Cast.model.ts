import { DataTypes, Model } from "sequelize";
import { MovieModel } from "./Movie.model";
import sequelize from "../config/database";
import { CastAttributes, CastCreationAttributes } from "../interfaces";
import { ActorModel } from "./Actor.model";

export class CastModel
  extends Model<CastAttributes, CastCreationAttributes>
  implements CastAttributes
{
  public castId!: string;
  public actorId!: string;
  public movieId!: string;
  public addedDate!: Date;
}

CastModel.init(
  {
    castId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    actorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "actors",
        key: "actorId",
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
    tableName: "cast",
    timestamps: true,
  }
);

ActorModel.belongsToMany(MovieModel, {
  through: CastModel,
  foreignKey: "actorId",
  as: "movies",
});

ActorModel.hasMany(CastModel, {
  foreignKey: "actorId",
  as: "actorInstances",
});

MovieModel.belongsToMany(ActorModel, {
  through: CastModel,
  foreignKey: "movieId",
  as: "actors",
});

MovieModel.hasMany(CastModel, {
  foreignKey: "movieId",
  as: "castEntries",
});

CastModel.belongsTo(MovieModel, {
  foreignKey: "movieId",
  as: "movie",
});
CastModel.belongsTo(ActorModel, {
  foreignKey: "actorId",
  as: "actor",
});
