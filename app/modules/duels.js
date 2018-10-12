const triggers = ['draw'];

module.exports = {
  set(bot, duel) {
    if (!duel.id) {
      duel.id = (bot.duels.count || 0) + 1;
    }

    // save

    return duel;
  },

  trigger: () => triggers[Math.floor(Math.random() * triggers.length)],
};

// example
// {
//   id: null
//   p1: null,
//   p2: null,
//   winner: null,
// }
