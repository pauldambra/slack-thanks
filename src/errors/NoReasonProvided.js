module.exports = class NoReasonProvided extends Error {
  constructor (command, ...args) {
    super(...args)
    this.commandText = command
    this.name = 'NoReasonProvided'
    Error.captureStackTrace(this, NoReasonProvided)
  }
}
