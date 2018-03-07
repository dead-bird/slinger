require('dotenv').config({path: '.env'});

const Discord = require('discord.js'),
      fs      = require('fs'),
      env     = process.env;

module.exports = {
  help: {
    desc: 'Lists my commands',
    args: '',
    execute: () => {
      console.log('commands');
    }
  },
  stats: {
    desc: 'Show off your glorious stats',
    args: '',
    execute: () => {
      console.log('stats should include rank, wins, losses, shots fired, hits, misses, K/D (needs calcing)');
    }
  },
};
