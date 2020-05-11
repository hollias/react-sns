import * as express from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as expressSession from 'express-session';
import * as dotenv from 'dotenv';
import * as passport from 'passport';
import * as hpp from 'hpp';
import * as helmet from 'helmet';

//import passportConfig from './passport';
import { sequelize } from './models';

const userAPIRouter = require('./routes/user');
const postAPIRouter = require('./routes/post');
const postsAPIRouter = require('./routes/posts');
const hashtagAPIRouter = require('./routes/hashtag');

dotenv.config();
const app = express();
const prod = process.env.NODE_ENV === 'production';

app.set('port', prod ? process.env.PORT : 3030);

if(prod){
  app.use(hpp());
  app.use(helmet());
  app.use(morgan('combined')); //log
  app.use(cors({
      origin: /nsworld\.com$/,           //cookie를 back과 front에서 주고 받기위한 설정
      credentials: true,      //front의 saga에서 와 함께 이곳도 설정해줘야함.
  }));
} else {
  app.use(morgan('dev')); //log
  app.use(cors({
    origin: true,           //cookie를 back과 front에서 주고 받기위한 설정
    credentials: true,      //front의 saga에서 와 함께 이곳도 설정해줘야함.
  }));
}

app.use('/', express.static('uploads'));    //첫번째 파라메터는 front에서 접근하는 주소 두번째는 back에서 실제 주소
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET!,
    cookie: {
        httpOnly: true,
        secure: false,
        domain: prod ? '.nsworld.com' : undefined
    },
    name: 'rnsc'
}));
app.use(passport.initialize());
app.use(passport.session());

sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  }).catch((err: Error) => {
    console.error(err);
  });
//passportConfig();


app.use('/api/user', userAPIRouter);
app.use('/api/post', postAPIRouter);
app.use('/api/posts', postsAPIRouter);
app.use('/api/hashtag', hashtagAPIRouter);

app.listen(3030, () => {
    console.log('server is running on http://localhost:3030');
});
