// todo: set up Babel

module.exports = {
  // User Helper Functions
  user: {
    // Grab ID from <!id> or <id>
    id: id => id.replace(/<@!(\d*)>|<@(\d*)>/g, '$1'),
  },
};
