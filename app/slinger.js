require('dotenv').config({ path: '.env' });

const { Client } = require('discord.js');
const EnmapLevel = require('enmap-level');
const pkg = require('../package.json');
const Clapp = require('clapp');
const env = process.env;
const bot = new Client();
const fs = require('fs');
// core = require('./modules/core.js'),
// Enmap = require('enmap'),

const app = new Clapp.App({
  name: 'Slinger',
  desc: pkg.description,
  prefix: 'slinger',
  separator: ' ',
  version: pkg.version,
  onReply(msg, context) {
    return context.msg.reply('\n' + 'howdy');
  },
});

fs.readdirSync('./app/commands/').forEach(file => {
  app.addCommand(require('./commands/' + file));
});

bot.on('message', msg => {
  if (app.isCliSentence(msg.content)) {
    app.parseInput(msg.content, { msg });
  }
});

bot.on('ready', () => {
  console.log('howdy');
  // client.config = new Enmap({provider: new EnmapLevel({name: 'config'})});
  // client.outlaws  = new Enmap({provider: new EnmapLevel({name: 'outlaws'})});
  // bot.user.setActivity('💯', { type: 'Playing' });
});

// client.on('guildCreate', guild => {
//   core.createGuild(client, guild.id);
// });

// createGuild: (client, id) => {
//   client.config.set(id, {
//     prefix: "!"
//   });
// },
// getOutlaw: (client, id) => {
//   return client.outlaws.get(id) || self.createOutlaw(client, id);
// },
// createOutlaw: (client, id) => {
//   let outlaw = { id: id, rank: 0, wins: 0, losses: 0, shots: 0, hits: 0, misses: 0 }

//   client.config.set(id, outlaw);

//   return outlaw;
// }

bot.login(env.TOKEN).catch(console.error);
