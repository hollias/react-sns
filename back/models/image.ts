import { Model, DataTypes } from "sequelize";
import sequelize from './sequelize';
import { dbType } from ".";

class Image extends Model {
  public readonly id!: number;
  public src!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Image.init({
  src: {
    type: DataTypes.STRING(200),
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Image',
  tableName: 'image',
  charset: 'utf8mb4', //  한글+이모티콘
  collate: 'utf8mb4_general_ci',
});

export const associate = (db: dbType) => {

}

export default Image;