require('dotenv').config({path: '.env'});

const commands = require('./commands.js'),
      env      = process.env;

module.exports = {
  init: (client) => {
    client.user.setPresence({game: {name: `in ${env.LOC}`, type: 0}});

    console.log('howdy pardner');
  },
  respond: (client, msg) => {
    // let prefix = config[msg.guild.id].prefix;

    // if (msg.content.startsWith(prefix)) {
    //   args = msg.content.slice(prefix.length).split(' ');

    //   if (args[0].toLowerCase() in commands) {
    //     commands[cmd].execute(client, msg, args);
    //   }
    // }
  },
  guild: (client, id) => {
    client.config.set(id, {
      prefix: "!"
    });
  }
}
