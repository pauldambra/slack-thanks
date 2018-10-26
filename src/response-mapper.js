
module.exports = {
  onSuccess: c => {
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
  },
  onNoToken: res => {
    res.statusCode = 400
    return res.json({
      errors: [{
        code: 2,
        message: 'You must send a slack token'
      }]
    })
  },
  onWrongToken: res => {
    res.statusCode = 401
    return res.end()
  },
  onNoText: res => {
    return res.json({
      response_type: 'ephemeral',
      text: `Something went wrong trying to understand that :(`
    })
  }
}
