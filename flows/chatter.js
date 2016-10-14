'use strict'

const handleHowAreYou = 'chatter:handleHowAreYou'

module.exports = (slapp) => {

  slapp.message('^(hi|hello|hey)$', ['direct_mention', 'direct_message'], (msg, text) => {
    msg.say(text + ', how are you?')
  })

  slapp.command('/start-demo', /.*/, (msg, text) => {

    let attachments = [{
      text: "You've got a meeting coming up. Would you like to order coffee?",
      fallback: 'Start order',
      callback_id: 'start_order_callback',
      actions: [
        { "name": "yes", "value": "yes", "text": "yes", "type": "button"},
        { "name": "no", "value": "no", "text": "no", "type": "button"}
        ]
    }]

    msg.say({
      text: text,
      attachments: attachments
    }, (err) => {
      if (err && err.message === 'channel_not_found') {
        msg.respond('Sorry, I can not write to a channel or group I am not a part of!')
      }
    })

  })

  slapp.action('start_order_callback', 'yes', (msg, value) => {
    let attachments = []

    function bottomActions(n){
      actions = []
      for(i=0; i<n; i++){
        actions.push({ "name": i + 1, "value": i + 1, "text": i + 1, "type": "button"})
      }

      return actions
    }

    attachments.push({
      title: "Ristretto",
      title_link: "https://www.nespresso.com/us/en/order/capsules/original/professional-ristretto",
      text: "A blend of South American and East African Arabicas, with a touch of Robusta, roasted separately to create the subtle fruity note of this full-bodied, intense espresso.",
      thumb_url: "https://www.nespresso.com/ecom/medias/sys_master/public/9375746555934/C-0023-small-60x60.png",
      footer: "20 pods in stock",
      actions: bottomActions(5)
    })

    attachments.push({
      title: "Fortissio Lungo",
      title_link: "https://www.nespresso.com/us/en/order/capsules/original/fortissio-lungo",
      text: "As in the age of sailing ships, West Indian Malabar Arabica beans are exposed to monsoon winds after harvest to reveal a distinguished aromatic profile, rich with cereal notes. We blend these with Latin American Arabica beans to create a lungo with a truly intense character.",
      thumb_url: "https://www.nespresso.com/ecom/medias/sys_master/public/9381719375902/C-0126-icon-42x42.png",
      footer: "6 pods in stock",
      actions: bottomActions(5)
    })

    attachments.push({
      title: "Envivo Lungo",
      title_link: "https://www.nespresso.com/us/en/order/capsules/original/envivo-lungo",
      text: "Envivo Lungo was specially designed for the morning by Nespresso Coffee Experts. It is a long-cup that stimulates the senses through its high intensity and generous character. This dark roasted coffee is a blend of a distinctive Arabica from India with a Robusta from Mexico. In cup, it reveals a potent character and a full body, roasted notes and rich scents reminiscent of aromatic woods and gingerbread.",
      thumb_url: "https://www.nespresso.com/ecom/medias/sys_master/public/10010672070686/C-CAPS-Icon-42x42.png",
      footer: "2 pods in stock",
      actions: bottomActions(2)
    })

    attachments.push({
      title: "Vivalto Lungo",
      title_link: "https://www.nespresso.com/us/en/order/capsules/original/vivalto-lungo",
      text: "Vivalto Lungo is a balanced coffee made from a complex blend of separately roasted South American and East African Arabicas, combining roasted and subtle floral notes.",
      thumb_url: "https://www.nespresso.com/ecom/medias/sys_master/public/9375747997726/C-0038-icon-42x42.png",
      footer: "2 pods in stock",
      actions: bottomActions(2)
    })

    msg.say({
      text: "Great! Lets create your order:",
      attachments: attachments
    }, (err) => {
      if (err && err.message === 'channel_not_found') {
        msg.respond('Sorry, I can not write to a channel or group I am not a part of!')
      }
    })
  })
}
