import { Model, DataTypes, BelongsToMany, BelongsToManyGetAssociationsMixin, BelongsToManyRemoveAssociationMixin, BelongsToManyAddAssociationMixin } from "sequelize";
import sequelize from './sequelize';
import { dbType } from ".";
import Post from "./post";

class User extends Model {
  public readonly id!: number;
  public nickname!: string;
  public userId!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly Posts?: Post[];
  public readonly Followings?: User[];
  public readonly Follower?: User[];

  public addFollowings!: BelongsToManyAddAssociationMixin<User, number>;
  public getFollowings!: BelongsToManyGetAssociationsMixin<User>;
  public removeFollowings!: BelongsToManyRemoveAssociationMixin<User, number>;
  public addFollowers!: BelongsToManyAddAssociationMixin<User, number>;
  public getFollowers!: BelongsToManyGetAssociationsMixin<User>;
  public removeFollowers!: BelongsToManyRemoveAssociationMixin<User, number>;
}

User.init({
  nickname: {
    type: DataTypes.STRING(20),
  },
  userId: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'user',
  charset: 'utf-8',
  collate: 'utf-8_general_ci'
});

export const associate = (db: dbType) => {
  db.User.hasMany(db.Post, { as: 'Posts' });
  db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'followerId' });
  db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'followingId' });
};

export default User;