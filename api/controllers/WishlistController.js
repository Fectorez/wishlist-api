/**
 * WishlistController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help  :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  createItem: async function(req, res) {
    const wishlistId = req.param('id');
    const foundWishlists = await Wishlist.find({where: {id: wishlistId}});
    if ( foundWishlists.length < 1 ) {
      return res.status(404).send({message: "Wishlist with id " + wishlistId + " does not exist"});
    }
    var data = req.body;
    data.wishlist = wishlistId;
    const item = await Item.create(data).fetch();
    return res.send(item);
  },

  createJackpot: async function(req, res) {
    const wishlistId = req.param('id');
    const foundWishlists = await Wishlist.find({where: {id: wishlistId}});
    if ( foundWishlists.length < 1 ) {
      return res.status(404).send({message: "Wishlist with id " + wishlistId + " does not exist"});
    }
    var data = req.body;
    data.wishlist = wishlistId;
    data.owner = foundWishlists[0].owner;
    const jackpot = await Jackpot.create(data).fetch();
    return res.send(jackpot);
  }

};

