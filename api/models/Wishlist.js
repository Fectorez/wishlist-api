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

    isPublic: {
      type: 'boolean',
      defaultsTo: false
    },



    items: {
      collection: 'item',
      via: 'wishlist'
    },

    prizePool: {
      collection: 'prizepool',
      via: 'wishlist'
    },

    owner: {
      model: 'user',
      required: true
    },

    participants: {
      collection: 'user',
      via: 'concernedWishlists'
    },

  },


  beforeDestroy: function(criteria, cb) {
    /*
      Détruire les relations avant l'objet lui-même
      (items et prizepools)
    */
    Wishlist.find(criteria).populate('items').populate('prizePool').exec(function(err, wishlists) {
      if ( err ) return cb(err);
      var itemsIds = [];
      var prizePoolsIds = [];
      wishlists.forEach(function(recordToDestroy) {
        itemsIds = itemsIds.concat(_.pluck(recordToDestroy.items, 'id'));
        prizePoolsIds = prizePoolsIds.concat(_.pluck(recordToDestroy.prizePool, 'id'));
      });
      Item.destroy({id: itemsIds}).exec(function(err) {
        if ( err ) return cb(err);
        PrizePool.destroy({id: prizePoolsIds}).exec(function(err) {
          if ( err ) return cb(err);
          return cb();
        });
      });
    });
  }

};

