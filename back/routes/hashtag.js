const express = require('express');
const db = require('../models');

const router = express.Router();

router.get('/:tag', async (req, res, next) => {
    try {
        console.log('router tag', req)
        const posts = await db.Post.findAll({
            include: [{
                model: db.Hashtag,
                where: {
                    name : decodeURIComponent(req.params.tag)
                }
            }, {
                model: db.User,
                attribute: ['id', 'nickname']
            }, {
                model: db.Image
            }, {
                model: db.User,
                through: 'Like',
                as: 'Likers',
                attributes: ['id']
            }]
        })
        res.json(posts);
    } catch (e) {
        console.log(e);
        next(e);
    }
});

module.exports = router;