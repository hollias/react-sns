const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs');

const db = require('./models');

const userAPIRouter = require('./routes/user');
const postAPIRouter = require('./routes/post');
const postsAPIRouter = require('./routes/posts');

const app = express();
db.sequelize.sync();    //sequelize로 db 제어

app.use(morgan({
    format: 'dev',
    stream: fs.createWriteStream('app.log', {'flags': 'w'})
})); //log
app.use(express.json());    
app.use(express.urlencoded({ extended: true})); //보통 폼 데이터나 AJAX요청의 데이터 처리를 위한 bodyparser 모듈
app.use(cors());    //front 서버와 back 서버가 서로 다른 서버이기때문에 상호 호출시 Cross-Origin-Resource-Sharing 관련 에러 발생

app.use('/api/user', userAPIRouter);
app.use('/api/post', postAPIRouter);
app.use('/api/posts', postsAPIRouter);

app.listen(8080, () => {
    console.log('server is running on http://localhost:8080');
});