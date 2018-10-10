const outlaws = require('../modules/outlaws');
const core = require('../modules/core');
const { Command } = require('clapp');

module.exports = new Command({
  name: 'duel',
  desc: ':gun: a witty desc about dueling',
  fn: (argv, { msg, bot }) =>
    new Promise((resolve, reject) => {
      let p1 = core.user.id(msg.author.id);
      let p2 = core.user.id(argv.args.user);

      if (core.user.status(msg.guild, p2) !== 'online') {
        resolve(`${argv.args.user} is offline`);
      }

      // if (p1 === p2) resolve("you can't fight yourself");

      p1 = outlaws.get(bot, p1);
      p2 = outlaws.get(bot, p2);

      msg.channel
        .send(
          `<@${p2.id}>. ${
            msg.author.username
          } challenged you to a duel! Type \`accept\` to begin.`
        )
        .then(() => {
          waitForAccept(msg, p1, p2);
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

function waitForAccept(msg, p1, p2) {
  msg.channel
    .awaitMessages(m => m.content === 'accept' && m.author.id === p2.id, {
      max: 1,
      time: 10000,
      errors: ['time'],
    })
    .then(() => msg.channel.send('player 2 accepted the duel.'))
    .catch(() => resolve("player 2 didn't accept the fight"));
}
