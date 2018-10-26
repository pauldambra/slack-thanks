module.exports = class InvalidCommandProvided extends Error {
  constructor (command, ...args) {
    super(...args)
    this.commandText = command
    this.name = 'InvalidCommandProvided'
    Error.captureStackTrace(this, InvalidCommandProvided)
  }
}
