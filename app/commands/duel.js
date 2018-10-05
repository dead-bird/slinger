const { Command } = require('clapp');

module.exports = new Command({
  name: 'duel',
  desc: ':gun: a witty desc about dueling',
  fn: (argv, context) =>
    new Promise((resolve, reject) => {
      console.log(context);

      resolve('test');
    }),
  args: [
    {
      name: '@user',
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
