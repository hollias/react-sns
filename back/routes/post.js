const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('./middleware');
const db = require('../models');

router.post('/', isLoggedIn , async (req, res, next) => {
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
        // const User = await newPost.getUser();
        // newPost.User = User;
        // res.json(newPost);
        const fullPost = await db.Post.findOne({
            where: { id: newPost.id },
            include: [{
                model: db.User,
            }],
        });

        return res.json(fullPost);
    } catch (e) {
        console.log(e);
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
        console.log(e);
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
        console.log(e);
        next(e);
    }
});

module.exports = router;