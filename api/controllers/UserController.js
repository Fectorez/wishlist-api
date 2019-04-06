/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    createWishlist: async function(req, res) {
        req.body.owner = req.param('id');
        var wishlist = await Wishlist.create(req.body).fetch();
        return res.send(wishlist);
    }

};

