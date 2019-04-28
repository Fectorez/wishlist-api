/**
 * Donation.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    amount: {
      type: 'number',
      required: true
    },



    prizePool: {
      model: 'prizepool',
      required: true
    },

    donor: {
      model: 'user',
      required: true
    },

  },

};

