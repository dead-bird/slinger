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
      const userId = core.user.id(argv.args.user);

      const user = userId
        ? context.msg.guild.members.get(userId).user
        : context.msg.author;

      const outlaw = outlaws.get(context.bot, user.id);

      const embed = new RichEmbed()
        .setColor(`#AB${user.discriminator}`)
        .setAuthor(user.username, core.user.avatar(user), null);

      Object.keys(outlaw).forEach(stat => {
        if (stat === 'id') return;

        embed.addField('\u200B', `**${icons[stat]} ${stat}:** ${outlaw[stat]}`, true);
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
