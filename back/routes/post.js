const express = require('express');
const router = express.Router();
const db = require('../models');

router.post('/', async (req, res) => {
    try {
        const hashtags = req.body.content.match(/#[^\s]+/g);
        const newPost = await db.Post.create({
            content: req.body.content,
            userId: req.body.userId
        });

        if(hashtags){
            const result = await Promise.all(hashtags.map((tag) => {
                db.Hashtag.findOrCreate({   //findOrCreate : 없으면 create 있으면 select
                    where : {
                        name: tag.slice(1).toLowerCase()
                    }
                })
            }));

            console.log(result);
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
        res.json(fullPost);
    } catch (e) {
        console.log(e);
        next(e);
    }
})

module.exports = router;