var express = require('express');
var authRouter = express.Router();
var passport = require('passport');

users = [];
users.push({id: 0, username: 'hola', password: 'mierda'});
var usersCount = 0;

function saveUserFrom(req) {
    usersCount += 1;
    var user = {
        id: usersCount,
        username: req.body.userName,
        password: req.body.password
    };
    users.push(user);
}
var router = function () {
    // If you want no one can connect to current url without login
    //authRouter.use(function(req, res, next) {
    //    if (!req.user) {
    //        res.redirect('/');
    //    }
    //    next();
    //});

    authRouter.route('/signUp')
        .post(function (req, res) {
            console.log(req.body);
            saveUserFrom(req);
            req.login(req.body, function() {
                res.redirect('/auth/profile');
            });
    });

    authRouter.route('/signIn')
        .post(passport.authenticate('local', {
            failureRedirect: '/'
        }), function(req, res) {
            res.redirect('/auth/profile');
        });

    authRouter.route('/profile')
        .all(function (req, res, next) {
            if (!req.user) {
                res.redirect('/');
            }
            next();
        })
        .get(function (req, res) {
            var response = {
                lastUser: req.user,
                allUsers: users
            };
            res.json(response);
        });

    return authRouter;
};

module.exports = router;