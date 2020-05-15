import * as express from 'express';
import * as bcrypt from 'bcrypt';
import * as passport from 'passport';
import { isLoggedIn } from './middleware';
import User from '../models/user';
import Post from '../models/post';

const router = express.Router();

router.get('/', isLoggedIn, (req: Express.Request, res) => {
  const user = req.user!.toJSON() as User;
  delete user.password;
  return res.json(user);
});

router.post('/', async (req, res, next) => {    //login
  try {
    const exUser = await User.findOne({
      where: {
        userId: req.body.userId,
      }
    })

    if (exUser) { //중복체크
      return res.status(403).send('이미 사용중인 아이디입니다.');
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = await User.create({
      nickname: req.body.nickname,
      userId: req.body.userId,
      password: hashedPassword
    });
    return res.status(200).json(newUser);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: parseInt(req.params.id, 10)
      },
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
      attributes: ['id', 'nickname']
    });

    const jsonUser = user.toJSON();
    jsonUser.Posts = jsonUser.Posts ? jsonUser.Posts.length : 0;
    jsonUser.Followings = jsonUser.Followings ? jsonUser.Followings.length : 0;
    jsonUser.Follower = jsonUser.Follower ? jsonUser.Follower.length : 0;
    res.json(jsonUser);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('로그아웃하였습니다.');
});
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      try {
        if (loginErr) {
          return next(loginErr);
        }

        const fullUser = await User.findOne({
          where: {
            id: user.id
          },
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
          attributes: ['id', 'nickname', 'userId']
        });

        return res.json(fullUser);
      } catch (e) {
        next(e);
      }
    })
  })(req, res, next);
});
router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
  try {
    const me = await User.findOne({
      where: {
        id: req.user.id
      }
    });
    await me.addFollowing(req.params.id);
    res.send(req.params.id);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.delete('/:id/unfollow', isLoggedIn, async (req, res, next) => {
  try {
    const me = await User.findOne({
      where: {
        id: req.user.id
      }
    });
    await me.removeFollowing(req.params.id);
    res.send(req.params.id);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.get('/:id/followings', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: parseInt(req.params.id, 10) || (req.user && req.user.id) || 0
      }
    });
    const followings = await user.getFollowings({
      attributes: ['id', 'nickname'],
      limit: parseInt(req.query.limit, 10),
      offset: parseInt(req.query.offset, 10),
    });

    res.json(followings);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.get('/:id/followers', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: parseInt(req.params.id, 10) || (req.user && req.user.id) || 0
      }
    });
    const followers = await user.getFollowers({
      attributes: ['id', 'nickname'],
      limit: parseInt(req.query.limit, 10),
      offset: parseInt(req.query.offset, 10),
    });

    res.json(followers);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.delete('/:id/follower', isLoggedIn, async (req, res, next) => {
  try {
    const me = await User.findOne({
      where: {
        id: req.user.id
      }
    });
    await me.removeFollower(req.params.id);
    res.send(req.params.id);
  } catch (e) {

  }
});

router.get('/:id/posts', async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      where: {
        UserId: parseInt(req.params.id, 10) || (req.user && req.user.id) || 0,
        RetweetId: null,
      },
      include: [{
        model: User,
        attributes: ['id', 'nickname']
      }, {
        model: Image
      }, {
        model: User,
        through: 'Like',
        as: 'Likers',
        attributes: ['id']
      }]
    });

    res.json(posts);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.patch('/nickname', isLoggedIn, async (req, res, next) => {
  try {
    await User.update({
      nickname: req.body.nickname
    }, {
      where: {
        id: req.user.id,
      }
    });
    res.send(req.body.nickname);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

module.exports = router;