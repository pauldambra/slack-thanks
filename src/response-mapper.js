
module.exports = {
  forCommand: c => {
    const m = {
      response_type: 'in_channel',
      text: `I've thanked ${c.recipient.replace('@', '')} for you`
    }
    if (c.description && c.description.length > 0) {
      m.attachments = c.description.map(d => ({ text: d }))
    }
    return m
  },
  forHelp: () => {
    const m = {
      response_type: 'in_channel',
      text: `the thanks command lets you thanks a colleague for something`
    }

    m.attachments = [
      { text: `try /wat thanks @pauldambra for telling me an anecdote or /thanks @santa for my new bike` }
    ]

    return m
  }
}
