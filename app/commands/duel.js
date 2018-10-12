const outlaws = require('../modules/outlaws');
const { RichEmbed } = require('discord.js');
const duels = require('../modules/duels');
const core = require('../modules/core');
const { Command } = require('clapp');
const options = {
  max: 1,
  time: 10000,
  errors: ['time'],
};

module.exports = new Command({
  name: 'duel',
  desc: ':gun: a witty desc about dueling',
  fn: (argv, { msg, bot }) =>
    new Promise((resolve, reject) => {
      const p1 = msg.author;
      const p2 = core.user.get(msg.guild, core.user.id(argv.args.user));

      console.log(p1);
      console.log(p2);

      resolve(false);

      if (p2.presence.status !== 'online') {
        resolve(`${argv.args.user} is offline`);
      }

      // if (p1.id === p2.id) resolve("you can't fight yourself");

      msg.channel
        .send(
          `<@${p2.id}>. ${
            msg.author.username
          } challenged you to a duel! Type \`accept\` to begin.`
        )
        .then(() => {
          waitForAccept(msg, bot, p1, p2);
          resolve(false);
        })
        .catch(console.error);
    }),
  args: [
    {
      name: 'user',
      desc: 'Tag the user to duel',
      type: 'string',
      required: true,
    },
  ],
});

function waitForAccept(msg, bot, p1, p2) {
  msg.channel
    .awaitMessages(m => m.content === 'accept' && m.author.id === p2.id, options)
    .then(() => fight(msg, bot, p1, p2))
    .catch(err => console.log(err));
}

function fight(msg, bot, p1, p2) {
  console.log(duels.trigger());

  // let duel = duels.set(bot, {
  //   p1,
  //   p2,
  //   winner: null,
  // });

  // const embed = new RichEmbed();

  // embed.addField(p1.username, 'data stuff', true);
  // embed.addField(p2, 'data stuff', true);

  // p1 = outlaws.get(bot, p1);
  // p2 = outlaws.get(bot, p2);

  // msg.channel.send({ embed });

  // msg.channel
  //   .awaitMessages(m => m.content === 'accept' && m.author.id === p2.id, options)
  //   .then(() => fight(msg, bot, p1, p2))
  //   .catch(err => console.log(err));

  msg.channel.send('player 2 accepted the duel.');
}
