const request = require('superagent')

module.exports = (responseUrl, command) => {
  return request
    .post(responseUrl)
    .send('yo!') // sends a JSON post body
    .set('Content-type', 'application/json')
}
