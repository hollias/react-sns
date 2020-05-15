import * as passport from 'passport';
import User from '../models/user';
import Post from '../models/post';

export default () => {
  passport.serializeUser((user: User, done) => {
    return done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await User.findOne({
        where: { id },
        include: [{
          model: Post,
          as: 'Posts',
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followings',
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followers',
          attributes: ['id'],
        }],
      });
      return done(null, user); // req.user
    } catch (err) {
      console.error(err);
      return done(err);
    }
  })
}