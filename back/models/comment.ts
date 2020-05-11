import { Model, DataTypes } from "sequelize/types";
import sequelize from './sequelize';
import { dbType } from ".";

class Comment extends Model{
  public readonly id!: number;
  public content!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Comment.init({
  content: {
    type: DataTypes.STRING(20),
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Comment',
  tableName: 'comment',
  charset: 'utf8mb4', //  한글+이모티콘
  collate: 'utf8mb4_general_ci',
});

export const associate = (db: dbType) => {

}

export default Comment;