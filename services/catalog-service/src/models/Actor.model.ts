import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { ActorAttributes, ActorCreationAttributes } from "../interfaces";

export class ActorModel
  extends Model<ActorAttributes, ActorCreationAttributes>
  implements ActorAttributes
{
  public actorId!: string;
  public name!: string;
  public birthDate!: string | null;
  public nationality!: string;
}

ActorModel.init(
  {
    actorId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    nationality: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "actors",
    timestamps: true,
  }
);
