/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help  :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  createWishlist: async function(req, res) {
    const ownerId = req.param('id');
    const foundUsers = await User.find({where: {id: ownerId}});
    if ( foundUsers.length < 1 ) {
      return res.status(404).send({message: "User with id " + ownerId + " does not exist"});
    }
    var data = req.body;
    data.owner = ownerId;
    const wishlist = await Wishlist.create(data).fetch();
    return res.send(wishlist);
  }

};

