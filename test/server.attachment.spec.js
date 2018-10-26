const request = require('supertest')
const appFactory = require('../src/app-factory')
const chai = require('chai')
const expect = chai.expect

describe('the integration', function () {
  let app

  beforeEach(function () {
    app = appFactory(1337, 'test', '#thanks')
  })

  it('can tell you when it has succeeded', function (done) {
    request(app)
      .post('/thanks')
      .send('text=@pauldambra for telling an anecdote')
      .send('token=test')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          done(err)
        }
        expect(res.body).to.eql(
          {
            'response_type': 'in_channel',
            'text': `I've thanked pauldambra for you`
          })
        done()
      })
  })
})
