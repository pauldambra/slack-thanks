const logger = require('heroku-logger')
const responseMapper = require('./response-mapper')
const parseCommand = require('./parse-command')
const thanksFilters = require('./thanks-filters.js')

const onErr = (err, res) => {
  logger.error(err)
  logger.error(`thanks command not valid: ${err.name}`)

  let text = 'unknown error'
  switch (err.name) {
    case 'NoRecipientProvided':
      text = 'you need to @ mention the person you\'re thanking before saying why'
      break
    case 'NoReasonProvided':
      text = 'you need to say why you\'re thanking someone'
      break
    default:
      text = `I don't know what '${err.commandText}' means :(`
  }

  return res.json({
    response_type: 'ephemeral',
    text
  })
}

const onCommand = (req, c, res, thanker) => {
  logger.info(`thanks command found: ${JSON.stringify(c)}`)

  return thanker(c)
    .then(x => res.json(responseMapper.forCommand(c)))
    .catch(err => {
      logger.error(`oh! oh! ${JSON.stringify(err)}`)
    })
}

const postThankyou = (channel, thanker) => {
  return (req, res) => {
    logger.info('handling thankyou request')
    parseCommand(req.body.text)
      .then(command => onCommand(req, command, res, thanker))
      .catch(err => onErr(err, res))
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
