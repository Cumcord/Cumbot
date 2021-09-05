// Import package.json to fetch useful info
const package = require("../../package.json");

module.exports = {
    vanity: {
        activity: {
            value: `over Cumcord | ${package.version}`,
            type: 'WATCHING' // You can use PLAYING, WATCHING and LISTENING
        }
    },
    
    routes: {
        // You can use multiple servers here.
        servers: [
            '824921608560181258',
        ],
    },

    users: {
        //? SuperUsers
        //* Every user here has access to any permission-locked commands.
        superUsers: [
            '257109471589957632',
        ],
    },
}