import { Model, DataTypes } from "sequelize";
import sequelize from './sequelize';
import { dbType } from ".";

class Post extends Model {
  public readonly id!: number;
  public content!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Post.init({
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  charset: 'utf8mb4', //  한글+이모티콘
  collate: 'utf8mb4_general_ci',
});

export const associate = (db: dbType) => {

}

export default Post;