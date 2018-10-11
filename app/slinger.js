require('dotenv').config({ path: '.env' });

const { Client } = require('discord.js');
const pkg = require('../package.json');
const Level = require('enmap-level');
const { App } = require('clapp');
const Enmap = require('enmap');
const fs = require('fs');
const bot = new Client();
const env = process.env;

const app = new App({
  name: 'Slinger',
  desc: pkg.description,
  prefix: 'slinger',
  separator: ' ',
  version: pkg.version,
  onReply(msg, context) {
    if (context.embed) {
      // I'm a mongo this can just be handled in the cmd with `content.msg.send({ embed })`
      return context.msg.channel.send({ embed: context.embed }).catch(console.error);
    }

    return context.msg.channel.send(msg).catch(console.error);
  },
});

fs.readdirSync('./app/commands/').forEach(file => {
  app.addCommand(require('./commands/' + file));
});

bot.on('message', msg => {
  if (app.isCliSentence(msg.content)) {
    app.parseInput(msg.content, { msg, bot });
  }
});

bot.on('ready', () => {
  bot.duels = new Enmap({ provider: new Level({ name: 'duels' }) });
  bot.config = new Enmap({ provider: new Level({ name: 'config' }) });
  bot.outlaws = new Enmap({ provider: new Level({ name: 'outlaws' }) });

  console.log('howdy');
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

bot.login(env.TOKEN).catch(console.error);
