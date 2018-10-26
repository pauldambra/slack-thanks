const express = require('express')

module.exports = (port, slackVerificationToken, channel) => {
  const app = express()
  app.use(express.urlencoded({ extended: true }))

  require('./thanks-route.js').register(app, slackVerificationToken, channel)

  return app
}
