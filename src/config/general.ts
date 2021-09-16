//* Cumbot
//? General config file

import meta from '../../package.json';
import { Config } from '../util/definitions';

export default new Config({
    // Servers that the bot has full operation in
    servers: [
        '824921608560181258',
    ],

    // Users with access to sensitive commands
    users: [
        '257109471589957632', '465702500146610176',
    ],

    activity: {
        name: `over the Cumcord server | ${meta.version}`,
        type: 'WATCHING',
    }
})