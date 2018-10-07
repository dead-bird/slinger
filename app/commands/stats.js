const outlaws = require('../modules/outlaws');
const { RichEmbed } = require('discord.js');
const core = require('../modules/core');
const { Command } = require('clapp');

const icons = {
  rank: ':muscle:',
  wins: ':cowboy:',
  losses: ':face_palm:',
  shots: ':gun:',
  kills: ':dart:',
  deaths: ':ghost:',
};

module.exports = new Command({
  name: 'stats',
  desc: ':muscle: Flex your stats',
  fn: (argv, context) =>
    new Promise((resolve, reject) => {
      const id = core.user.id(argv.args.user || context.msg.author.id);
      const user = outlaws.get(context.bot, id);

      // K/D needs thinking about
      const embed = new RichEmbed()
        .setColor(3447003)
        .setDescription(`stats for <@${user.id}>`)
        .setThumbnail(context.bot.user.avatarURL)
        .addBlankField(true);

      // console.log(user);
      // console.log(Object.keys(user));

      Object.keys(user).forEach(stat => {
        if (stat === 'id') return;

        embed.addField('\u200B', `**${icons[stat]} ${stat}:** ${user[stat]}`);
      });

      resolve({
        message: '',
        context: { embed, ...context },
      });
    }),
  args: [
    {
      name: 'user',
      desc: 'Optional: Tag a user to see their stats',
      type: 'string',
      required: false,
      default: '',
      // validations: [
      //   {
      //     errorMessage: 'Too many characters!',
      //     validate: t => t.split('').length <= 14,
      //   },
      // ],
    },
  ],
});
