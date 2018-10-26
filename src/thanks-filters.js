const logger = require('heroku-logger')
const responseMapper = require('./response-mapper')

const ensureBodyHasTextInRequest = (req, res, next) => {
  if (!req.body || !req.body.text) {
    logger.error(`there was no text in request in ${JSON.stringify(req.body)}`)
    return responseMapper.onNoText(res)
  } else {
    logger.info(`thanks lookup received for ${req.body.text}`)
    next()
  }
}

const ensureTokenIsPresent = (req, res, next) => {
  if (!req.body || !req.body.token) {
    return responseMapper.onNoToken(res)
  } else {
    next()
  }
}

const ensureVerificationIsValid = slackVerificationToken => {
  return (req, res, next) => {
    if (req.body.token !== slackVerificationToken) {
      return responseMapper.onWrongToken(res)
    } else {
      next()
    }
  }
}

module.exports = {
  addTo: (app, slackVerificationToken) => {
    app.use('/thanks', ensureBodyHasTextInRequest)
    app.use('/thanks', ensureTokenIsPresent)
    app.use('/thanks', ensureVerificationIsValid(slackVerificationToken))
  }
}
