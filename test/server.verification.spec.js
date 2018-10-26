const request = require('supertest')
const appFactory = require('../src/app-factory')

describe('the server', function () {
  let app

  beforeEach(function () {
    app = appFactory(1337, 'the token', '#thanks')
  })

  it('can respond with an error when tokens do not match', function (done) {
    request(app)
      .post('/thanks')
      .send('text=@santa for my bike')
      .send('token=not the token')
      .expect(401, done)
  })
})
