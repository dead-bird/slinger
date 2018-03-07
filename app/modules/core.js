require('dotenv').config({path: '.env'});

const commands = require('./commands.js'),
      env      = process.env;

let self = module.exports = {
  init: (client) => {
    console.log('howdy pardner');
  },
  respond: (client, msg, core) => {
    let prefix = client.config.get(msg.guild.id).prefix;

    if (msg.content.startsWith(prefix)) {
      let args = msg.content.slice(prefix.length).split(' '),
          cmd  = args[0].toLowerCase();

      if (cmd in commands) {
        commands[cmd].execute(client, msg, args, core);
      }
    }
  },
  createGuild: (client, id) => {
    client.config.set(id, {
      prefix: "!"
    });
  },
  getOutlaw: (client, id) => {
    return client.outlaws.get(id) || self.createOutlaw(client, id);
  },
  createOutlaw: (client, id) => {
    let outlaw = { id: id, rank: 0, wins: 0, losses: 0, shots: 0, hits: 0, misses: 0 }

    client.config.set(id, outlaw);

    return outlaw;
  }
}
