/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */
/*
var path = require('path');
var express = require('express');
var dir = path.join(path.join(__dirname, '..'), 'public/');
var serveStatic = require('serve-static');
console.log("dir=",dir)*/
module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


  'POST   /login': 'AuthController.login',
  '      /logout': 'AuthController.logout',

  'POST /users/:id/wishlists': 'UserController.createWishlist',
  'POST /wishlists/:id/items': 'WishlistController.createItem',
  'POST /wishlists/:id/prizepool': 'WishlistController.createPrizePool',





  'GET /register': { view: 'register' },
  'GET    /login': { view: 'login' },

  'get /user/token': 'AuthController.token',

  'get /comparator': 'ComparatorController.comparator',
  'get /recomendation': 'RecomendationController.recomendation',

  'POST /save-donation': 'PaypalController.saveDonation',
  'POST /receive-donations': 'PaypalController.receiveDonations',

  'POST /find-item-data-from-amazon-url': 'ItemController.findDataFromAmazonUrl',
  'POST /create-item-from-amazon-url': 'ItemController.createItemFromAmazonUrl',


  //'POST /paypal-transaction-complete': 'PaypalController.handleRequest',

  //'POST /pay': 'PaypalController.pay',
  //'GET /success': 'PaypalController.success',
  //'GET /cancel': 'PaypalController.cancel'

  'POST /save-image': 'FileController.saveImage',
  //'/public/*': serveStatic(dir, {skipAssets: true}),
  //'/public/*': express.static(dir)

};
