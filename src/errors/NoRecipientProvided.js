module.exports = class NoRecipientProvided extends Error {
  constructor (command, ...args) {
    super(...args)
    this.commandText = command
    this.name = 'NoRecipientProvided'
    Error.captureStackTrace(this, NoRecipientProvided)
  }
}
