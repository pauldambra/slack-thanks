const request = require('supertest')
const appFactory = require('../src/app-factory')
const chai = require('chai')
const expect = chai.expect

describe('the server', function () {
  let app

  beforeEach(function () {
    app = appFactory(1337, 'test', '#thanks')
  })

  it('can respond to a thanks command', function (done) {
    request(app)
      .post('/thanks')
      .send('text=@pauldambra for telling me an anecdote')
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

  it('can respond to a different thanks command', function (done) {
    request(app)
      .post('/thanks')
      .send('text=@santa for my new bike')
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
            'text': `I've thanked santa for you`
          })
        done()
      })
  })

  it('can error if you do not send text', function (done) {
    request(app)
      .post('/thanks')
      .send('token=test')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          done(err)
        }
        expect(res.body).to.eql(
          {
            'response_type': 'ephemeral',
            'text': `Something went wrong trying to understand that :(`
          })
        done()
      })
  })

  it('can tell you when you miss off a recipient', function (done) {
    request(app)
      .post('/thanks')
      .send('text= for my new bike')
      .send('token=test')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          done(err)
        }
        expect(res.body).to.eql(
          {
            'response_type': 'ephemeral',
            'text': `you need to @ mention the person you're thanking before saying why`
          })
        done()
      })
  })

  it('can tell you when you don\'t say why', function (done) {
    request(app)
      .post('/thanks')
      .send('text=@santa')
      .send('token=test')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          done(err)
        }
        expect(res.body).to.eql(
          {
            'response_type': 'ephemeral',
            'text': `you need to say why you're thanking someone`
          })
        done()
      })
  })

  it('can error if you do not send a token', function (done) {
    request(app)
      .post('/thanks')
      .send('text=present')
      .expect('Content-Type', /json/)
      .expect(400, done)
  })

  it('can give help', function (done) {
    request(app)
      .post('/thanks')
      .send('text=help')
      .send('token=test')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})
