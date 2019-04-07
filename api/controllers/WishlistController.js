/**
 * WishlistController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help  :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  createItem: async function(req, res) {
    req.body.wishlist = req.param('id');
    var item = await Item.create(req.body).fetch();
    return res.send(item);
  }

};

