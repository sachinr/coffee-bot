'use strict'

const handleHowAreYou = 'chatter:handleHowAreYou'

module.exports = (slapp) => {

  slapp.message('^(hi|hello|hey)$', ['direct_mention', 'direct_message'], (msg, text) => {
    msg.say(text + ', how are you?')
  })

  slapp.command('/start-demo', /.*/, (msg, text) => {
    text = "starting demo"
    attachments = []

    attachments.push({
      text: 'Something',
      fallback: 'move to the bottom',
      callback_id: 'in_or_out_callback',
      actions: bottomActions
    })

    msg.say({
      text: text,
      attachments: attachments
    }, (err) => {
      if (err && err.message === 'channel_not_found') {
        msg.respond('Sorry, I can not write to a channel or group I am not a part of!')
      }
    })

  })

  slapp.action('in_or_out_callback', 'recycle', (msg, value) => {
    var orig = msg.body.original_message
    var update = {
      text: 'In or out (moved to bottom): ' + orig.text,
      delete_original: true
    }
    msg.respond(update, (err) => {
      if (err) return handleError(err, msg)
      msg.say({
        text: orig.text,
        attachments: orig.attachments
      })
    })
  })
}
