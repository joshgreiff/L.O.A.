require('dotenv').config()
const slackBot = require("slackbots")

const slackToken = process.env.SLACK_TOKEN

const ai = require('./ai')

const bot = new slackBot({
    token : slackToken,
    name : 'L.O.A.',
})

bot.on("start", function(){
    // bot.postMessageToChannel("testing", )
})


bot.on('message', (data) => {
    if(data.type !== 'message' || data.subtype === 'bot_message' || data.subtype === 'message_changed'){
        if(data.type !== 'reaction_added') {
            return
        } else {
            return
        }
    }
    console.log(data)

    bot.getChannels().then(res => {
        const channelsArr = res.channels
        const result = channelsArr.find(x => x.id === data.channel)
        messageHandler(data, result)
    }).catch(err => {
        console.log(err)
    })
})


function messageHandler(data, channel) {
        const message = data.text || ''
       
        ai(message, channel, 'prompt')
        
}


module.exports = bot