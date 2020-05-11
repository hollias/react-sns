import { Model, DataTypes } from "sequelize/types";
import sequelize from './sequelize';
import { dbType } from ".";

class Hashtag extends Model {
  public readonly id!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Hashtag.init({
  name: {
    type: DataTypes.STRING(20),
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Hashtag',
  tableName: 'hashtag',
  charset: 'utf8mb4', //  한글+이모티콘
  collate: 'utf8mb4_general_ci',
});

export const associate = (db: dbType) => {

}

export default Hashtag;