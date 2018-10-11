const self = (module.exports = {
  // get: (bot, id) => bot.duels.get(id) || self.set(bot, id),

  set(bot, duel) {
    if (!duel.id) {
      duel.id = (bot.duels.count || 0) + 1;
    }

    console.log(duel);

    // save
    return duel;
  },
});

// example
// {
//   id: null
//   p1: null,
//   p2: null,
//   winner: null,
// }
