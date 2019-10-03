const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', async (req, res) => {
    try {
        const posts = await db.Post.findAll({
            include: [{
                model: db.User,
                attributes: ['id', 'nickname']
            }],
            order: [['createdAt','DESC'], ['updatedAt','DESC']],
        });
        console.log('posts : ', posts)
        res.json(posts);
    } catch (e) {
        console.log(e);
        next(e);
    }
});

module.exports = router;