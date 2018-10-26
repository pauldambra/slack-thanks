const logger = require('heroku-logger')
const responseMapper = require('./response-mapper')
const parseCommand = require('./parse-command')
const thanksFilters = require('./thanks-filters.js')
const errorMapper = require('./errors/error-mapper.js')

const thankAndRespond = (c, res, thanker) => {
  logger.info(`thanks command found: ${JSON.stringify(c)}`)

  return thanker(c)
    .then(x => res.json(responseMapper.onSuccess(c)))
    .catch(err => {
      logger.error(`oh! oh! ${JSON.stringify(err)}`)
      errorMapper.onErr(err, res)
    })
}

const postThankyou = (channel, thanker) => {
  return (req, res) => {
    logger.info('handling thankyou request')
    parseCommand(req.body.text)
      .then(command => thankAndRespond(command, res, thanker))
      .catch(err => errorMapper.onErr(err, res))
  }
}

const sendHelpIfNeeded = (req, res, next) => {
  if (req.body.text === 'help') {
    res.json(responseMapper.forHelp())
  } else {
    next()
  }
}

module.exports = {
  register: (app, slackVerificationToken, channel, thanker) => {
    thanksFilters.addTo(app, slackVerificationToken)

    app.post('/thanks', sendHelpIfNeeded)
    app.post('/thanks', postThankyou(channel, thanker))
  }
}
