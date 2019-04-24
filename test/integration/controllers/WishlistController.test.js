var supertest = require('supertest');

describe('WishlistController', function() {

  describe('#delete()', function() {

    it('Should succeed', function (done) {
      User.find({limit: 1}).exec( (err, users) => {
        if ( err ) throw err;
        Wishlist.create({name: "wishlistTestCascade", owner: users[0].id}).fetch().exec( (err, wishlist) => {
          if ( err ) throw err;
          supertest(sails.hooks.http.app)
          .delete('/wishlist/' + wishlist.id)
          .expect(200, done);
        });
      });
    });
  });

  describe('#createItem()', function() {

    it('Should succeed with correct wishlist id', function (done) {
      Wishlist.find({limit: 1}).exec( (err, wishlists) => {
        const wishlistId = wishlists[0].id;
        supertest(sails.hooks.http.app)
        .post('/wishlist/' + wishlistId + '/items')
        .send({ name: 'itemTestSuccess' })
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

  describe('#createJackpot()', function() {

    it('Should succeed with correct wishlist id', function (done) {
      Wishlist.find({limit: 1}).exec( (err, wishlists) => {
        const wishlistId = wishlists[0].id;
        supertest(sails.hooks.http.app)
        .post('/wishlist/' + wishlistId + '/jackpots')
        .send({ name: 'jackpotTestSuccess', owner: wishlists[0].owner })
        .expect(200, done);
      });
    });

    it('Should fail with incorrect wishlist id', function (done) {
      const wishlistId = 999999;
      supertest(sails.hooks.http.app)
      .post('/wishlist/' + wishlistId + '/jackpots')
      .send({ name: 'jackpotTestFail' })
      .expect(404, done);
    });

  });

  describe('#deleteItem()', function() {

    it('Related item should be destroyed', function (done) {
      User.find({limit: 1}).exec( (err, users) => {
        if ( err ) throw err;
        Wishlist.create({name: "wishlistTestCascade", owner: users[0].id}).fetch().exec( (err, wishlistTestCascade) => {
          if ( err ) throw err;
          Item.create({name: "itemDeletedWithCascade", price: 9.99, wishlist: wishlistTestCascade.id}).fetch().exec( (err, itemDeletedWithCascade) => {
            if ( err ) throw err;
            Wishlist.destroy(wishlistTestCascade).exec( err => {
              if ( err ) throw err;
              supertest(sails.hooks.http.app)
              .get('/item/' + itemDeletedWithCascade.id)
              .expect(404, done);
            });
          });
        });
      });
    });
  });

  describe('#deleteJackpot()', function() {

    it('Related jackpot should be destroyed', function (done) {
      User.find({limit: 1}).exec( (err, users) => {
        if ( err ) throw err;
        Wishlist.create({name: "wishlistTestCascade", owner: users[0].id}).fetch().exec( (err, wishlistTestCascade) => {
          if ( err ) throw err;
          Jackpot.create({name: "jackpotDeletedWithCascade", owner:users[0].id, wishlist: wishlistTestCascade.id}).fetch().exec( (err, jackpotDeletedWithCascade) => {
            if ( err ) throw err;
            Wishlist.destroy(wishlistTestCascade).exec( err => {
              if ( err ) throw err;
              supertest(sails.hooks.http.app)
              .get('/jackpot/' + jackpotDeletedWithCascade.id)
              .expect(404, done);
            });
          });
        });
      });
    });
  });

});