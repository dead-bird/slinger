const { Command } = require('clapp');

module.exports = new Command({
  name: 'stats',
  desc: ':muscle: Flex your stats',
  fn: (argv, context) =>
    new Promise((resolve, reject) => {
      // // K/D needs thinking about
      // let user = core.getOutlaw(client, msg.author.id);
      // let embed = new Discord.RichEmbed()
      //   .setColor(3447003)
      //   .setDescription(`stats for <@${msg.author.id}>`)
      //   .setThumbnail(client.user.avatarURL)
      //   .addBlankField(true);

      // for (stat in user) {
      //   if (stat !== 'id') {
      //     embed.addField('\u200B', `**${stat}:** ${user[stat]}`);
      //   }
      // }

      // resolve({ embed });
      resolve('test');
    }),
  args: [
    {
      name: '@user',
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
