require('dotenv').config({path: '.env'});

const Discord       = require('discord.js'),
      EnmapLevel    = require('enmap-level'),
      core          = require('./modules/core.js'),
      Enmap         = require('enmap'),
      client        = new Discord.Client,
      env           = process.env;
      
client.on('ready', () => {
  client.config = new Enmap({provider: new EnmapLevel({name: 'config'})});
  client.outlaws  = new Enmap({provider: new EnmapLevel({name: 'outlaws'})});

  core.init(client);
});

client.on('message', msg => {
  core.respond(msg);
});

client.on('guildCreate', guild => {
  core.guild(client, guild.id);
});

client.login(env.TOKEN);
