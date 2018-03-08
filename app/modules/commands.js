require('dotenv').config({path: '.env'});

const Discord = require('discord.js'),
      env     = process.env;

module.exports = {
  help: {
    icon: ':bellhop:',
    desc: 'Lists my commands',
    args: '',
    execute: (client, msg) => {
      msg.delete().then().catch(console.error);

      let prefix = client.config.get(msg.guild.id).prefix;

      let embed = new Discord.RichEmbed()
        .setColor(3447003)
        .setDescription(':information_source: here are my commands')
        .setThumbnail(client.user.avatarURL) // Bot's avatar
        .addBlankField(true);

      for (var trigger in module.exports) {
        if (trigger) {
          let cmd = module.exports[trigger];

          embed.addField('\u200B', `**${cmd.icon} ${prefix}${trigger} ${cmd.args}**\n:white_small_square: ${cmd.desc}`);
        }
      }

      msg.channel.send({embed});
    }
  },
  stats: {
    icon: ':muscle:',
    desc: 'Flex your stats',
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
  duel: {
    icon: ':gun:',
    desc: 'Challenge another user to a gunfight',
    args: '@user',
    execute: () => {
      
    }
  }
};
