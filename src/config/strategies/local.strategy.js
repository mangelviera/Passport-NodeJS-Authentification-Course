var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;


module.exports = function () {
    passport.use(new LocalStrategy({
        usernameField: 'userName',
        passwordField: 'password'
    },
    function(username, password, done) {
        var user = {
            username : username,
            password : password
        };

        users.forEach(function (currentUser) {
            if (currentUser.username == user.username) {
                if (currentUser.password == user.password) done(null, user);
                else { done(null, false, {message : "Bad login"}); }
            } else {
                done(null, false, {message : "Bad login"});
            }
        });
    }));
};
