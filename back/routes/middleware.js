// const db = require('../models');

exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    } else {
        res.status(401).send('로그인이 필요합니다.');
    }
}

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        next();
    } else {
        res.status(401).send('로그인이 필요합니다.');
    }
}

// exports.isExistPost = async (req, res, next) => {
//     const post = await db.Post.findOne({
//         where: {
//             id : req.params.postId
//         }
//     });

//     if(!post){
//         res.status(404).send('포스트가 존재하지 않습니다.');
//     }else{
//         console.log('포스트췍 클릭어')
//         next(post);
//     }
// }