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
    return _.omit(this, ['password']);
  },

  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, (err, salt) => {
      if( err ) {
        return cb(err);
      }
      bcrypt.hash(user.password, salt, null, (err, hash) => {
        if ( err ) {
          return cb(err);
        }
        user.password = hash;
        return cb();
      });
    });
  },

  beforeDestroy: function(criteria, cb) {
    User.find(criteria).populate('wishlists').exec(function(err, users) {
      if ( err ) return cb(err);
      var wishlistsIds = [];
      users.forEach(function(recordToDestroy) {
        wishlistsIds = wishlistsIds.concat(_.pluck(recordToDestroy.wishlists, 'id'));
      });
      Wishlist.destroy({id: wishlistsIds}).exec(function(err) {
        if ( err ) return cb(err);
        return cb();
      });
    });
  }

};

