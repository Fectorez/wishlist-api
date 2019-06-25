const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');

passport.serializeUser( (user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser( (id, cb) => {
  User.findOne({id}, (err, user) => {
    cb(err, user);
  });
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passportField: 'password'
}, (email, password, cb) => {
  User.findOne({email: email}, (err, user) => {
    if ( err ) {
      return cb(err);
    }
    if ( !user ) {
      return cb(null, false, {message: 'Email not found'});
    }
    bcrypt.compare(password, user.password, (err, res) => {
      if ( err ) {
        return cb(err);
      }
      if ( !res ) {
        return cb(null, false, { message: 'Invalid Password' });
      }
      let userDetails = {
        id: user.id,
        email: user.email,
        firstName: user.firstName
      };
      return cb(null, userDetails, { message: 'Login Successful'});
    });
  });
}));
