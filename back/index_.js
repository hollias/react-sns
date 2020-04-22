const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');
const passportConfig = require('./passport');

const db = require('./models');

const userAPIRouter = require('./routes/user');
const postAPIRouter = require('./routes/post');
const postsAPIRouter = require('./routes/posts');
const hashtagAPIRouter = require('./routes/hashtag');

dotenv.config();
const app = express();
db.sequelize.sync();
passportConfig();

app.use(morgan('dev')); //log
app.use('/', express.static('uploads'));    //첫번째 파라메터는 front에서 접근하는 주소 두번째는 back에서 실제 주소
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors({
    origin: true,           //cookie를 back과 front에서 주고 받기위한 설정
    credentials: true,      //front의 saga에서 와 함께 이곳도 설정해줘야함.
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
    resave: false,
    saveUninitalized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false
    },
    name: 'rnsc'
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/user', userAPIRouter);
app.use('/api/post', postAPIRouter);
app.use('/api/posts', postsAPIRouter);
app.use('/api/hashtag', hashtagAPIRouter);

app.listen(3030, () => {
    console.log('server is running on http://localhost:3030');
});
