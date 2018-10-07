const blank = {
  rank: 0,
  wins: 0,
  losses: 0,
  shots: 0,
  kills: 0,
  deaths: 0,
};

const self = (module.exports = {
  get: (bot, id) => bot.outlaws.get(id) || self.set(bot, id),

  set(bot, user) {
    if (typeof user === 'string') {
      user = { id: user, ...blank };
    }

    // console.log('set', user);

    // save
    return user;
  },
});
