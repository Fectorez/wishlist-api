/**
 * Item.js
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

    description: {
      type: 'string'
    },

    amount: {
      type: 'number',
      required: true
    },

    image: {
      type: 'string'
    },

    link: {
      type: 'string',
      columnType: 'varchar (2000)'
    },

    position: {
      type: 'number',
      required: true
    },


    
    wishlist: {
      model: 'wishlist',
      required: true
    },

    category: {
      model: 'category'
    }

  }

};

