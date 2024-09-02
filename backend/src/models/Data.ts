import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Data extends Model {
  public id!: number;
  public update_id!: string;
  public date!: number;
  public message_id!: string;
  public text!: string;
  public first_name!: string;
  public username!: string;
  public readonly created_at!: Date;
}

Data.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    update_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "data",
  }
);

export default Data;
