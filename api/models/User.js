/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const bcrypt = require('bcrypt-nodejs');

module.exports = {

  attributes: {

    email: {
      type: 'string',
      isEmail: true,
      required: true,
      unique: true
    },

    username: {
      type: 'string',
      required: true,
      unique: true
    },

    password: {
      type: 'string',
      required: true
    },

    wishlists: {
      collection: 'wishlist',
      via: 'owner'
    }
  },
  
  customToJSON: function() {
    return _.omit(this, ['password'])
  },

  beforeCreate: function(user, cb){
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, null, function(err, hash) {
        if ( err ) return cb(err);
        user.password = hash;
        return cb();
      });
    });
  }
};

