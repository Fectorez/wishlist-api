var supertest = require('supertest');

describe('WishlistController', function() {

  describe('#createItem()', function() {

    it('Should succeed with correct wishlist id', function (done) {
      Wishlist.find({limit: 1}).exec( (err, wishlists) => {
        const wishlistId = wishlists[0].id;
        supertest(sails.hooks.http.app)
        .post('/wishlist/' + wishlistId + '/items')
        .send({ name: 'itemTestSucceed' })
        .expect(200, done);
      });
    });

    it('Should fail with incorrect wishlist id', function (done) {
      const wishlistId = 999999;
      supertest(sails.hooks.http.app)
      .post('/wishlist/' + wishlistId + '/items')
      .send({ name: 'itemTestFail' })
      .expect(404, done);
    });

  });

});