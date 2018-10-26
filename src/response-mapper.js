
module.exports = {
  forCommand: c => {
    const m = {
      response_type: 'ephemeral',
      text: `I've thanked ${c.name} for you`
    }
    if (c.description && c.description.length > 0) {
      m.attachments = c.description.map(d => ({ text: d }))
    }
    return m
  },
  forHelp: () => {
    const m = {
      response_type: 'ephemeral',
      text: `the thanks command lets you thanks a colleague for something`
    }

    m.attachments = [
      { text: `try /thanks @pauldambra for telling me an anecdote or /thanks @santa for my new bike` }
    ]

    return m
  }
}
