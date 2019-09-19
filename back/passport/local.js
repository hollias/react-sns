const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('../models');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'userId',
        passwordField: 'password'
    }, async (userId, password, done) => {
        try {
            const user = await db.User.findOne({
                where: { userId },
            })

            if(!user){
                return done(null, false, { reason: '존재하지 않는 사용자입니다.'});
            }
            const result = await bcrypt.compare(password, user.password);
            if(!result){
                return done(null, false, { reason: '비밀번호가 틀렸습니다.'});
            }
            
            return done(null, user);
        } catch (e) {
            console.error(e);
            return done(e);
        }
    }))
}