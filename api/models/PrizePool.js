/**
 * PrizePool.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    endDate: {
      type: 'number',
      required: true
    },

    closed: {
      type: 'boolean',
      defaultsTo: false
    },


    wishlist: {
      model: 'wishlist',
      required: true,
      unique: true
    },

    manager: {
      model: 'user',
      required: true
    },

    donations: {
      collection: 'donation',
      via: 'prizePool'
    }

  },

};

