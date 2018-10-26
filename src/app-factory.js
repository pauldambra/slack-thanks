const express = require('express')

module.exports = (port, slackVerificationToken, channel, thanker) => {
  const app = express()
  app.use(express.urlencoded({ extended: true }))

  require('./thanks-route.js').register(
    app,
    slackVerificationToken,
    channel,
    thanker)

  return app
}
