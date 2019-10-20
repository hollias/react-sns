const express = require('express');
const router = express.Router();
const { isLoggedIn, isExistPost } = require('./middleware');
const db = require('../models');
const multer = require('multer');
const path = require('path');

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done){
            done(null, 'uploads');  //passport의 사용법과 비슷 앞의 파라메터는 실패했을때 뒤에것은 성공했을때
        },
        filename(req, file, done){
            const ext = path.extname(file.originalname);
            const basename = path.basename(file.originalname, ext);
            done(null, basename + new Date().valueOf() + ext);
        },
        limits: {   //업로드시 제한하는곳, 추가적으로 파일 업로드 갯수등 multer의 사이트에서 확인
            fileSize: 20* 1024 * 1024
        }
    })
});

router.post('/', isLoggedIn, upload.none() , async (req, res, next) => {
    try {
        // if(!req.user){   //middleware에서 공통처리
        //     return res.status(401).send('로그인이 필요합니다.');
        // }
        const hashtags = req.body.content.match(/#[^\s]+/g);
        const newPost = await db.Post.create({
            content: req.body.content,
            UserId: req.user.id
        });

        if(hashtags){
            const result = await Promise.all(hashtags.map((tag) => {
                return db.Hashtag.findOrCreate({   //findOrCreate : 없으면 create 있으면 select
                    where : {
                        name: tag.slice(1).toLowerCase()
                    }
                })
            }));
            await newPost.addHashtags(result.map(r => r[0]))
        }
        if(req.body.image){
            if(Array.isArray(req.body.image)){  //multer가 formdata를 가져올때 여러개를 올리면 image: [주소1, 주소2] 식의 배열로
                const images = await Promise.all(req.body.image.map((image) => {
                    return db.Image.create({ src: image });
                }));
                await newPost.addImages(images);
            } else {    ////multer가 formdata를 가져올때 한개를 올리면 image: 주소1 식의 문자로
                const image = await db.Image.create({ src: req.body.image });
                await newPost.addImage(image);
            }
        }

        // const User = await newPost.getUser();
        // newPost.User = User;
        // res.json(newPost);
        const fullPost = await db.Post.findOne({
            where: { id: newPost.id },
            include: [{
                model: db.User,
            }, {
                model: db.Image,
            }],
        });

        return res.json(fullPost);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.get('/:id/comments', async (req, res, next) => {
    try {
        const post = await db.Post.findOne({
            where : {
                id : req.params.id
            }
        });
        if(!post){
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }

        const comments = await db.Comment.findAll({
            where : {
                PostId : post.id
            },
            order : [['createdAt', 'ASC']],
            include : {
                model : db.User,
                attributes : ['id', 'nickname'],
            }
        });
        return res.json(comments);
    } catch (e) {
        console.error(e);
        next(e);
    }
});
router.post('/:id/comment', isLoggedIn, async (req, res, next) => {
    try {
        // if(!req.user){
        //     return res.status(401).send('로그인이 필요합니다.');
        // }

        const post = await db.Post.findOne({
            where : {
                id: req.params.id
            }
        });
        if(!post){
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        const newCommnet = await db.Comment.create({
            PostId: post.id,
            UserId: req.user.id,
            content: req.body.content,
        });
        await post.addComment(newCommnet.id);
        
        const comment = await db.Comment.findOne({
            where: {
                id: newCommnet.id
            },
            include: {
                model : db.User,
                attributes : ['id', 'nickname']
            }
        });

        return res.json(comment);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

//upload.array 이미지 여러개 올릴때
//upload.single 이미지 한개만 올릴때
//upload.fields front에서 보내주는 FormData의 key값이 다를때 
//upload.none 이미지를 하나도 올리지 않을때
//parameter 는 front에서 보내주는 formdata의 키값
router.post('/images', upload.array('image'), (req, res) => {
    res.json(req.files.map(v => v.filename));
});

router.post('/:postId/like', isLoggedIn, async (req, res, next) => {
    try {
        const post = await db.Post.findOne({
            where: {
                id : req.params.postId
            }
        });

        if(!post){
            res.status(404).send('포스트가 존재하지 않습니다.');
        }

        await post.addLiker(req.user.id);
        res.json({
            userId: req.user.id
        })
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.delete('/:postId/like', isLoggedIn, async (req, res, next) => {
    try {
        const post = await db.Post.findOne({
            where: {
                id : req.params.postId
            }
        });

        if(!post){
            res.status(404).send('포스트가 존재하지 않습니다.');
        }

        await post.removeLiker(req.user.id);
        res.json({
            userId: req.user.id
        })
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.post('/:postId/retweet', isLoggedIn, async (req, res, next) => {
    try {
        const post = await db.Post.findOne({
            where: {
                id : req.params.postId
            }
        });

        if(!post){
            res.status(404).send('포스트가 존재하지 않습니다.');
        }

        if(req.user.id === post.UserId){
            res.status(403).send('자신의 글은 리트윗할 수 없습니다.')
        }

        const retweetTargetId = post.RetweetId || post.id
        const exPost = await db.Post.findOne({
            where: {
                userId : req.user.id,
                retweetId : retweetTargetId,
            }
        })
        if(exPost){
            return res.status(403).send('이미 리트윗했습니다.');
        }
        
        const retweet = await db.Post.create({
            UserId: req.user.id,
            RetweetId: retweetTargetId,
            content: 'retweet'
        });

        const reteetWithPrevPost = await db.Post.findOne({
            where: {
                id: retweet.id
            },
            include: [{
                model: db.User,
                attributes: ['id','nickname']
            }, {
                model: db.Post,
                as: 'Retweet',
                include: [{
                    model:db.User,
                    attributes: ['id','nickname']
                }, {
                    model: db.Image
                }]
            }]
        });

        res.json(reteetWithPrevPost);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;