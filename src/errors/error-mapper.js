const logger = require('heroku-logger')

module.exports = {
  onErr: (err, res) => {
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
}
