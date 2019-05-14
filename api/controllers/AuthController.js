/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help    :: See https://sailsjs.com/docs/concepts/actions
 */

const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports = {

  login: function(req, res) {
    passport.authenticate('local', (err, user, info) => {
      if ( err || !user ) {
        return res.status(401).send({
          message: info.message,
          user
        });
      }
      req.logIn(user, (err) => {
        if ( err ) {
          return res.status(401).send({
            message: info.message,
            user
          });
        }
        user.token = jwt.sign(user, "secret", {
          expiresIn: '7d'
        });
        return res.send({
          message: info.message,
          user
        });
      });
    })(req, res);
  },

  token: function(req, res) {
    User.findOne(req.user.id).exec(function callback(error, user) {
      if (error) return res.serverError(error);
      if (!user) return res.serverError("User not found");

      user.token = jwt.sign({email: user.email, id: user.id}, "secret", {
        expiresIn: '7d'
      });
      
      res.ok(user);
    });
  },


  logout: function(req, res) {
    req.logout();
    return res.send();
  }

};

