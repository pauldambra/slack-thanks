const appFactory = require('./app-factory')
const logger = require('heroku-logger')

const port = process.env.PORT || 3000

const token = process.env.SLACK_TOKEN
if (!token) {
  throw new Error('you must set the SLACK_TOKEN environment variable')
}

const channel = process.env.SLACK_CHANNEL
if (!channel) {
  throw new Error('you must set the SLACK_CHANNEL environment variable')
}

const app = appFactory(port, token, channel)

app.listen(
  port,
  () => logger.info(`server started on ${port}`))

module.exports = app
