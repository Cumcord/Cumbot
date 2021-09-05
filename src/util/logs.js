// Import Chalk
const chalk = require('chalk')

module.exports = {
    //* clientLog
    //? A console.log wrapper used for logging any info about the client, and making it look nice.
    clientLog: async function(content) { console.log(chalk.blue('Client') + chalk.grey(' | ') +  chalk.white(content)) },

    //* warnLog
    //? A console.warn wrapper for logging warnings, making them distinguishable.
    warnLog: async function(content) { console.warn(chalk.magenta('Warn') + chalk.grey('   | ') +  chalk.white(content)) },

    //* errorLog
    //? A console.error wrapper used for logging any errors, and making it easily visible.
    errorLog: async function(content) { console.error(chalk.red('Error') + chalk.grey('  | ') +  chalk.white(content)) },
}