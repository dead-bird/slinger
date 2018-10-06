const outlaws = require('../modules/outlaws');
const core = require('../modules/core');
const { Command } = require('clapp');

module.exports = new Command({
  name: 'duel',
  desc: ':gun: a witty desc about dueling',
  fn: (argv, context) =>
    new Promise((resolve, reject) => {
      const challenger = outlaws.get(
        context.bot,
        core.getId(context.msg.author.id)
      );
      const offender = outlaws.get(context.bot, core.getId(argv.args.user));

      resolve('test');
    }),
  args: [
    {
      name: 'user',
      desc: 'Tag the user to duel',
      type: 'string',
      required: true,
      // validations: [
      //   {
      //     errorMessage: 'invalid user',
      //     validate: tag => /<@!(\d*)>|<@(\d*)>/g.test(tag),
      //   },
      // ],
    },
  ],
});
