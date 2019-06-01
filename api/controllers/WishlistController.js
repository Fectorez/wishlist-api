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

  createPrizePool: async function(req, res) {
    const wishlistId = req.param('id');
    const foundWishlists = await Wishlist.find({where: {id: wishlistId}});

    if ( foundWishlists.length < 1 ) {
      return res.status(404).send({message: "Wishlist with id " + wishlistId + " does not exist"});
    }

    const alreadyStoredPrizePools = await PrizePool.find({where: {wishlist: wishlistId}});
    if ( alreadyStoredPrizePools.length > 0 ) { // Une cagnotte existe déjà. Erreur.
      return res.status(409).send({
        status: 409,
        message: "Cannot create a PrizePool to Wishlist with id " + wishlistId + " because a PrizePool already exists."
      });
    }

    var data = req.body;
    data.wishlist = wishlistId;
    const prizePool = await PrizePool.create(data).fetch();
    return res.send(prizePool);
  }

};

