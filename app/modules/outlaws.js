const blank = {
  rank: 0,
  wins: 0,
  losses: 0,
  shots: 0,
  hits: 0,
  misses: 0,
};

export default {
  get(bot, id) {
    return {};
  },
  
  set(bot, user) {
    if (typeof user === 'string') {
      user = { user: .id, ...blank };
    }
    // save
    return {};
  }
},
