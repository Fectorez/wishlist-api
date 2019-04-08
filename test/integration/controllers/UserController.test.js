var supertest = require('supertest');

describe('UserController', function() {

  describe('#createWishlist()', function() {

    it('Should succeed with correct owner id', function (done) {
      User.find({limit: 1}).exec( (err, users) => {
        const userId = users[0].id;
        supertest(sails.hooks.http.app)
        .post('/user/' + userId + '/wishlists')
        .send({ name: 'wishlistTestSucceed' })
        .expect(200, done);
      });
    });

    it('Should fail with incorrect owner id', function (done) {
      const userId = 999999;
      supertest(sails.hooks.http.app)
      .post('/user/' + userId + '/wishlists')
      .send({ name: 'wishlistTestFail' })
      .expect(404, done);
    });

  });

});