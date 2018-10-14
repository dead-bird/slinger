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

      if (p2.presence.status !== 'online') {
        resolve(`${argv.args.user} is offline`);
      }

      // if (p1.id === p2.id) resolve("you can't fight yourself");

      msg.channel
        .send(
          `<@${p2.id}>. ${
            p1.username
          } challenged you to a duel! Type \`accept\` to begin.`
        )
        .then(() => {
          msg.channel
            .awaitMessages(m => m.content === 'accept' && m.author.id === p2.id, options)
            .then(() => countdown(msg, bot, p1, p2))
            .catch(err => console.log(err));

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

function countdown(msg, bot, p1, p2) {
  const trigger = duels.trigger();

  let embed = {
    fields: [
      { name: p1.username, value: 'data stuff', inline: true },
      { name: p2.username, value: 'data stuff', inline: true },
      { name: 3, value: '\u200B' },
    ],
  };

  msg.channel.send({ embed }).then(msg => {
    let index = 3;

    const count = setInterval(() => {
      if (index >= 2) {
        embed.fields[2].name = --index;
      } else {
        embed.fields[2].name = trigger;

        clearInterval(count);
        duel(msg, bot, p1, p2, trigger);
      }

      msg.edit({ embed });
    }, 1000);
  });
}

function duel(msg, bot, p1, p2, trigger) {
  p1 = outlaws.get(bot, p1.id);
  p2 = outlaws.get(bot, p2.id);

  let duel = duels.set(bot, {
    p1: p1.id,
    p2: p2.id,
    winner: null,
  });

  msg.channel
    .awaitMessages(m => m.content === trigger && m.author.id === p2.id, options)
    .then(thing => console.log(thing))
    .catch(err => console.log(err));
}
