const request = require('superagent')

module.exports = (responseUrl) => (command) => {
  console.log(responseUrl, 'ru')
  return request
    .post(responseUrl)
    .set('Content-type', 'application/json')
    .send({
      text: `someone wants to thank ${command.recipient} for ${command.reason}`
    })
}
