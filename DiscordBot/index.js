const botConfig = require("./botconfig.json");
const admin = require('firebase-admin');
const serviceAccount = require('service_account.json')
const {
    Client,
    Intents
} = require('discord.js');

const client = new Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER', 'GUILD_MEMBER', 'REACTION'],
    intents: Object.keys(Intents.FLAGS)
});

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

client.on('message', msg => {
    if (msg.author.bot) return;
    if (!(msg.member.roles.cache.some(role => role.id === botConfig.notifierRole))) {
        msg.channel.send(botConfig.noPermission)
        return;
    }

    msg.channel.send(botConfig.sendingMessage)
    const args = msg.trim().split(' ');
    args.shift();
    admin.messaging().sendToTopic(
        "general_notifications",
        {
            notification: {
                title: args.shift(),
                body: args.join(' ')
            }
        }
    ).then( response => {

        msg.channel.send(botConfig.sentMessage)

    })
        .catch( error => {
            msg.channel.send(botConfig.errorMessage)
            console.log(error);
        });

});

client.login(botConfig.token);