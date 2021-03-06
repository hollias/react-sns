const express = require('express');
const db = require('../models');

const router = express.Router();

router.get('/:tag', async (req, res, next) => {
    try {
        let where = {};
        if(parseInt(req.query.lastId, 10)){
            where = {
                id: {
                    [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10)
                }
            }
        }
        const posts = await db.Post.findAll({
            where,
            limit: parseInt(req.query.limit, 10),
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
            }, {
                model: db.Post,
                as: 'Retweet',
                include: [{
                    model: db.User,
                    attributes: ['id', 'nickname']
                }, {
                    model: db.Image
                }]
            }],
            order: [['createdAt', 'DESC']]
        })
        res.json(posts);
    } catch (e) {
        console.log(e);
        next(e);
    }
});

module.exports = router;