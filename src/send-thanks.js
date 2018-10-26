const request = require('superagent')
const logger = require('heroku-logger')

module.exports = (responseUrl) => {
  logger.info(`setting up thanker with url: ${responseUrl}`)

  return (command) => {
    logger.info(`thanker processing ${command}`)
    return request
      .post(responseUrl)
      .set('Content-type', 'application/json')
      .send({
        text: `someone wants to thank <${command.recipient}> for ${command.reason}`
      })
  }
}
