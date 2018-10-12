// todo: set up Babel

module.exports = {
  // User Helper Functions
  user: {
    // Grab ID from <!id> or <id>
    id: id => id.replace(/<@!(\d*)>|<@(\d*)>/g, '$1'),

    // Get User from ID
    get: (guild, id) => guild.members.get(id).user,

    // Get User from ID and return status
    status: (guild, id) => guild.members.get(id).user.presence.status,

    avatar: u => `https://discordapp.com/api/users/${u.id}/avatars/${u.avatar}.jpg`,
  },
};
