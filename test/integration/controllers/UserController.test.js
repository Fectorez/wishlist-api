var supertest = require('supertest');

describe('UserController', function() {

  describe('#delete()', function() {

    it('Should succeed', function (done) {
      User.create({username: "userTestDelete", email: "userTestDelete@yopmail.com", password: "azerty123"}).fetch().exec( (err, user) => {
        if ( err ) throw err;
        supertest(sails.hooks.http.app)
        .delete('/user/' + user.id)
        .expect(200, done);
      });
    });

    it('Related wishlist should be destroyed', function (done) {
      User.create({username: "userTestDeleteCascade", email: "userTestDeleteCascade@yopmail.com", password: "azerty123"}).fetch().exec( (err, user) => {
        if ( err ) throw err;
        Wishlist.create({name: "wishlistDestroyedByCascade", owner: user.id}).fetch().exec( (err, wishlistDestroyedByCascade) => {
          if ( err ) throw err;
          User.destroy(user).exec( err => {
            if ( err ) throw err;
            supertest(sails.hooks.http.app)
            .get('/wishlist/' + wishlistDestroyedByCascade.id)
            .expect(404, done);
          });
        });
      });
    });

    it('Related jackpot should be destroyed', function (done) {
      User.create({username: "userTestDeleteCascade", email: "userTestDeleteCascade@yopmail.com", password: "azerty123"}).fetch().exec( (err, user) => {
        if ( err ) throw err;
        Wishlist.create({name: "wishlistDestroyedByCascade", owner: user.id}).fetch().exec( (err, wishlistDestroyedByCascade) => {
          if ( err ) throw err;
          Jackpot.create({name: "jackpotDestroyedByCascade", owner: user.id, wishlist: wishlistDestroyedByCascade.id}).fetch().exec( (err, jackpotDestroyedByCascade) => {
            if ( err ) throw err;
            User.destroy(user).exec( err => {
              if ( err ) throw err;
              supertest(sails.hooks.http.app)
              .get('/jackpot/' + jackpotDestroyedByCascade.id)
              .expect(404, done);
            });
          });
        });
      });
    });

  });

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