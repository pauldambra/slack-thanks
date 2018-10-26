const parseCommand = require('../src/parse-command.js')
const expect = require('chai').expect
const NoRecipientProvided = require('../src/errors/NoRecipientProvided')
const NoReasonProvided = require('../src/errors/NoReasonProvided')
const InvalidCommandProvided = require('../src/errors/InvalidCommandProvided')

describe('parsing the received command', () => {
  describe('can identify incorrect commands and throw', () => {
    it('can tell you when there is no recipient', (done) => {
      parseCommand('for a new bike')
        .then(x => done('fail! should not get here'))
        .catch(err => {
          expect(err).to.exist
            .and.be.instanceof(NoRecipientProvided)
          done()
        })
    })

    it('can tell you when there is no reason', (done) => {
      parseCommand('<@U1234|user>')
        .then(x => done('fail! should not get here'))
        .catch(err => {
          expect(err).to.exist
            .and.be.instanceof(NoReasonProvided)
          done()
        })
    })

    it('can tell you when there is neither recipient nor reason', (done) => {
      parseCommand('what even is this?')
        .then(x => done('fail! should not get here'))
        .catch(err => {
          expect(err).to.exist
            .and.be.instanceof(InvalidCommandProvided)
          done()
        })
    })
  })

  it('can parse an expected command', async () => {
    const result = await parseCommand('<@U1234|donna> for telling an anecdote')

    expect(result.recipient).to.equal('@U1234')
    expect(result.name).to.equal('donna')
    expect(result.reason).to.equal('telling an anecdote')
  })
})
