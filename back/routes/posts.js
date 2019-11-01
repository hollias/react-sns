const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', async (req, res) => {
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
                model: db.User,
                attributes: ['id', 'nickname']
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
            order: [['createdAt','DESC'], ['updatedAt','DESC']],

        });
        res.json(posts);
    } catch (e) {
        console.log(e);
        next(e);
    }
});

module.exports = router;