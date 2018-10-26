const logger = require('heroku-logger')
const responseMapper = require('./response-mapper')
const parseCommand = require('./parse-command')

const onErr = (err, res) => {
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

const onCommand = (c, res) => {
  logger.info(`thanks command found: ${JSON.stringify(c)}`)
  return res.json(responseMapper.forCommand(c))
}

const postThankyou = channel => {
  return (req, res) => {
    logger.info('handling thankyou request')
    parseCommand(req.body.text)
      .then(command => onCommand(command, res))
      .catch(err => onErr(err, res))
  }
}

const onNoText = res => {
  return res.json({
    response_type: 'ephemeral',
    text: `Something went wrong trying to understand that :(`
  })
}

const onNoToken = res => {
  res.statusCode = 400
  return res.json({
    errors: [{
      code: 2,
      message: 'You must send a slack token'
    }]
  })
}

const onWrongToken = res => {
  res.statusCode = 401
  return res.end()
}

const ensureBodyHasTextInRequest = (req, res, next) => {
  if (!req.body || !req.body.text) {
    logger.error(`there was no text in request in ${JSON.stringify(req.body)}`)
    return onNoText(res)
  } else {
    logger.info(`thanks lookup received for ${req.body.text}`)
    next()
  }
}

const ensureTokenIsPresent = (req, res, next) => {
  if (!req.body || !req.body.token) {
    return onNoToken(res)
  } else {
    next()
  }
}

const ensureVerificationIsValid = slackVerificationToken => {
  return (req, res, next) => {
    if (req.body.token !== slackVerificationToken) {
      return onWrongToken(res)
    } else {
      next()
    }
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
  register: (app, slackVerificationToken, channel) => {
    app.use('/thanks', ensureBodyHasTextInRequest)
    app.use('/thanks', ensureTokenIsPresent)
    app.use('/thanks', ensureVerificationIsValid(slackVerificationToken))

    app.post('/thanks', sendHelpIfNeeded)
    app.post('/thanks', postThankyou(channel))
  }
}
