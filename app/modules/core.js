module.exports = {
  // Grab ID from <!id> or <id>
  getId: id => id.replace(/<@!(\d*)>|<@(\d*)>/g, '$1'),
};
