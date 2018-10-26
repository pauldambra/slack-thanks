const request = require('supertest')
const appFactory = require('../src/app-factory')

describe('the server', function () {
  let app

  beforeEach(function () {
    const nullThanker = () => Promise.resolve()
    app = appFactory(1337, 'the token', '#thanks', nullThanker)
  })

  it('can respond with an error when tokens do not match', function (done) {
    request(app)
      .post('/thanks')
      .send('text=<@U1234|user> for my bike')
      .send('token=not the token')
      .expect(401, done)
  })
})
