/**
 * Wishlist.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true
    },

    owner: {
      model: 'user',
      required: true
    },

    items: {
      collection: 'item',
      via: 'wishlist'
    }

  },


  beforeDestroy: function(criteria, cb) {
    Wishlist.find(criteria).populate('items').exec(function(err, wishlists) {
      if ( err ) return cb(err);
      var itemsIds = [];
      wishlists.forEach(function(recordToDestroy) {
        itemsIds = itemsIds.concat(_.pluck(recordToDestroy.items, 'id'));
      });
      Item.destroy({id: itemsIds}).exec(function(err) {
        if ( err ) return cb(err);
        return cb();
      });
    });
  }

};

