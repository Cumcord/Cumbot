// Import Chalk
import chalk from 'chalk';

//* clientLog
//? A console.log wrapper used for logging any info about the client, and making it look nice.
export const clientLog = async function (content: any) {
  console.log(chalk.blue('Client') + chalk.grey(' | ') + chalk.white(content));
};

//* warnLog
//? A console.warn wrapper for logging warnings, making them distinguishable.
export const warnLog = async function (content: any) {
  console.warn(chalk.magenta('Warn') + chalk.grey('   | ') + chalk.white(content));
};

//* errorLog
//? A console.error wrapper used for logging any errors, and making it easily visible.
export const errorLog = async function (content: any) {
  console.error(chalk.red('Error') + chalk.grey('  | ') + chalk.white(content));
};

