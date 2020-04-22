export * from './sequelize';

import User, { associate as associateUser } from './user';
import Post, { associate as associatePost } from './post';

const db = {
  User,
  Post,
}

export type dbType = typeof db;
associateUser(db);
associatePost(db);