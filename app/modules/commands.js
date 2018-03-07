require('dotenv').config({path: '.env'});

const Discord = require('discord.js'),
      env     = process.env;

module.exports = {
  help: {
    desc: 'Lists my commands',
    args: '',
    execute: () => {
      console.log('commands');
    }
  },
  stats: {
    desc: 'Show off your glorious stats',
    args: '',
    execute: (client, msg, args, core) => { // K/D needs thinking about
      let user  = core.getOutlaw(client, msg.author.id);
      let embed = new Discord.RichEmbed()
        .setColor(3447003)
        .setDescription(`stats for <@${msg.author.id}>`)
        .setThumbnail(client.user.avatarURL)
        .addBlankField(true);

      for (stat in user) {
        if (stat !== 'id') embed.addField('\u200B', `**${stat}:** ${user[stat]}`);
      }

      msg.channel.send({embed});
    }
  },
};
