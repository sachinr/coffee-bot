'use strict'

const handleHowAreYou = 'chatter:handleHowAreYou'

module.exports = (slapp) => {

  slapp.message('^(hi|hello|hey)$', ['direct_mention', 'direct_message'], (msg, text) => {
    msg.say(text + ', how are you?')
  })

  slapp.command('/start-demo', /.*/, (msg, text) => {
    let attachments = []
    let bottomActions = [
				{ "name": "1", "value": "1", "text": "1", "type": "button", "style": "primary" },
				{ "name": "2", "value": "2", "text": "2", "type": "button" },
				{ "name": "3", "value": "3", "text": "3", "type": "button" },
				{ "name": "4", "value": "4", "text": "4", "type": "button" },
				{ "name": "5", "value": "5", "text": "5", "type": "button" }
			]

    attachments.push({
      title: "Ristretto",
      title_link: "https://www.nespresso.com/us/en/order/capsules/original/professional-ristretto",
      text: "A blend of South American and East African Arabicas, with a touch of Robusta, roasted separately to create the subtle fruity note of this full-bodied, intense espresso.",
      thumb_url: "https://www.nespresso.com/ecom/medias/sys_master/public/9375746555934/C-0023-small-60x60.png",
      footer: "20 pods in stock",
      actions: bottomActions
    })

    attachments.push({
      title: "Fortissio Lungo",
      title_link: "https://www.nespresso.com/us/en/order/capsules/original/fortissio-lungo",
      text: "As in the age of sailing ships, West Indian Malabar Arabica beans are exposed to monsoon winds after harvest to reveal a distinguished aromatic profile, rich with cereal notes. We blend these with Latin American Arabica beans to create a lungo with a truly intense character.",
      thumb_url: "https://www.nespresso.com/ecom/medias/sys_master/public/9381719375902/C-0126-icon-42x42.png",
      footer: "6 pods in stock",
      actions: bottomActions
    })

    //{
			//"title": "Envivo Lungo",
			//"title_link": "https://www.nespresso.com/us/en/order/capsules/original/envivo-lungo",
			//"text": "Envivo Lungo was specially designed for the morning by Nespresso Coffee Experts. It is a long-cup that stimulates the senses through its high intensity and generous character. This dark roasted coffee is a blend of a distinctive Arabica from India with a Robusta from Mexico. In cup, it reveals a potent character and a full body, roasted notes and rich scents reminiscent of aromatic woods and gingerbread.",
			//"thumb_url": "https://www.nespresso.com/ecom/medias/sys_master/public/10010672070686/C-CAPS-Icon-42x42.png",
			//"footer": "2 pods in stock",
			//"actions": [
				//{ "name": "1", "value": "1", "text": "1", "type": "button" },
				//{ "name": "2", "value": "2", "text": "2", "type": "button" }
			//]
		//}, {
			//"title": "Vivalto Lungo",
			//"title_link": "https://www.nespresso.com/us/en/order/capsules/original/vivalto-lungo",
			//"text": "Vivalto Lungo is a balanced coffee made from a complex blend of separately roasted South American and East African Arabicas, combining roasted and subtle floral notes.",
			//"thumb_url": "https://www.nespresso.com/ecom/medias/sys_master/public/9375747997726/C-0038-icon-42x42.png",
			//"footer": "2 pods in stock",
			//"actions": [
				//{ "name": "1", "value": "1", "text": "1", "type": "button" },
				//{ "name": "2", "value": "2", "text": "2", "type": "button" },
				//{ "name": "3", "value": "3", "text": "3", "type": "button", "style": "primary" },
				//{ "name": "4", "value": "4", "text": "4", "type": "button" },
				//{ "name": "5", "value": "5", "text": "5", "type": "button" }
			//]
		//}, {
			//"pretext": "You've selected 8 cups of Nespresso to prepare. Would you like to submit your order?",
			//"actions": [
				//{ "name": "submit", "value": "submit", "text": "Submit Order", "type": "button", "style": "primary" },
				//{ "name": "cancel", "value": "cancel", "text": "Cancel", "type": "button", "style": "danger" }
			//]
		//}
    //]
    //})

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
