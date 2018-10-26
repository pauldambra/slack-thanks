const NoRecipientProvided = require('./errors/NoRecipientProvided.js')
const NoReasonProvided = require('./errors/NoReasonProvided.js')
const InvalidCommandProvided = require('./errors/InvalidCommandProvided.js')

const tryMatch = (command, pattern) => {
  const match = command.match(pattern)
  return match && match[0].trim()
}

const matchReason = command => {
  const reason = tryMatch(command, /for .*/)
  return reason && reason.replace('for ', '')
}

const matchRecipient = command => {
  const recipient = tryMatch(command, /^<@U\w+|/)
  return recipient && recipient.replace('|', '').replace('<@', '@')
}

const matchName = command => {
  const recipient = tryMatch(command, /\|\w+>/)
  return recipient && recipient.replace('|', '').replace('>', '')
}

const identifyError = (command, reason, recipient) => {
  let err
  if (reason && !recipient) {
    err = new NoRecipientProvided(command)
  } else if (recipient && !reason) {
    err = new NoReasonProvided(command)
  } else {
    err = new InvalidCommandProvided(command)
  }
  return err
}

module.exports = command => {
  return new Promise((resolve, reject) => {
    const recipient = matchRecipient(command)
    const name = matchName(command)
    const reason = matchReason(command)

    if (recipient && reason) {
      resolve({
        recipient,
        name,
        reason
      })
    }

    reject(identifyError(command, reason, recipient))
  })
}
