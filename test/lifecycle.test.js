var sails = require('sails');

// Before running any tests...
before(function(done) {

  // Increase the Mocha timeout so that Sails has enough time to lift, even if you have a bunch of assets.
  this.timeout(5000);

  sails.lift({
    // Your sails app's configuration files will be loaded automatically,
    // but you can also specify any other special overrides here for testing purposes.

    // For example, we might want to skip the Grunt hook,
    // and disable all logs except errors and warnings:
    hooks: { grunt: false },
    log: { level: 'warn' },
    datastore: { default: { url: 'mysql://sails:sails@localhost/iwish_tests' } } // iwish_tests doesn't work

  }, async function(err) {
    if (err) { return done(err); }

    // here you can load fixtures, etc.
    // (for example, you might want to create some records in the database)

    const userTest = await User.create({username: "userTest", email: "userTest@yopmail.com", password: "azerty123"}).fetch();
    const wishlistTest = await Wishlist.create({name: "wishlistTest", owner: userTest.id}).fetch();
    /*const userTestCascade = await User.create({username: "userTestCascade", email: "userTestCascade@yopmail.com", password: "azerty123"}).fetch();
    const wishlistTestCascade = await Wishlist.create({name: "wishlistTestCascade", owner: userTestCascade.id}).fetch();
    const itemTestCascade = await Item.create({name: "itemTestCascade", price: 9.99, wishlist: wishlistTestCascade.id}).fetch();*/

    return done();
  });
});

// After all tests have finished...
after(function(done) {

  // here you can clear fixtures, etc.
  // (e.g. you might want to destroy the records you created above)

  User.destroy({username: "userTest"}).then( () => {
    sails.lower(done);
  });

});
