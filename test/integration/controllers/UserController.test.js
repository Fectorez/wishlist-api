var supertest = require('supertest');

describe('UserController.login', function() {

  describe('#login()', function() {

    it('Should fail with bad username', function (done) {
      supertest(sails.hooks.http.app)
      .post('/login')
      .send({ username: 'badUsername', password: 'password' })
      .expect(401, done);
    });

    it('Should fail with bad password', function (done) {
      supertest(sails.hooks.http.app)
      .post('/login')
      .send({ username: 'test', password: 'badPassword' })
      .expect(401, done);
    });

    it('Should succeed with correct credentials', function (done) {
      supertest(sails.hooks.http.app)
      .post('/login')
      .send({ username: 'test', password: 'azerty123' })
      .expect(200, done);
    });
  });

});