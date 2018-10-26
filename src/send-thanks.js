const request = require('superagent')
const logger = require('heroku-logger')

module.exports = (responseUrl) => (command) => {
  logger.info(`response url set to ${responseUrl}: processing ${command}`)
  return request
    .post(responseUrl)
    .set('Content-type', 'application/json')
    .send({
      text: `someone wants to thank <${command.recipient}> for ${command.reason}`
    })
}
