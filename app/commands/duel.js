const { Command } = require('clapp');

module.exports = new Command({
  name: 'duel',
  desc: ':gun: a witty desc about dueling',
  fn: (argv, context) =>
    new Promise((resolve, reject) => {
      resolve('test');
    }),
  args: [
    {
      name: '@user',
      desc: 'Tag the user to fight',
      type: 'string',
      required: true,
      // default: '',
      // validations: [
      //   {
      //     errorMessage: 'Too many characters!',
      //     validate: t => t.split('').length <= 14,
      //   },
      // ],
    },
  ],
});
