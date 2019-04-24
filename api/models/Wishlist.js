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
    },

    jackpots: {
      collection: 'jackpot',
      via: 'wishlist'
    }

  },


  beforeDestroy: function(criteria, cb) {
    /*
      Détruire les relations avant l'objet lui-même
      (items et jackpots)
    */
    Wishlist.find(criteria).populate('items').populate('jackpots').exec(function(err, wishlists) {
      if ( err ) return cb(err);
      var itemsIds = [];
      var jackpotsIds = [];
      wishlists.forEach(function(recordToDestroy) {
        itemsIds = itemsIds.concat(_.pluck(recordToDestroy.items, 'id'));
        jackpotsIds = jackpotsIds.concat(_.pluck(recordToDestroy.jackpots, 'id'));
      });
      Item.destroy({id: itemsIds}).exec(function(err) {
        if ( err ) return cb(err);
        Jackpot.destroy({id: jackpotsIds}).exec(function(err) {
          if ( err ) return cb(err);
          return cb();
        });
      });
    });
  }

};

