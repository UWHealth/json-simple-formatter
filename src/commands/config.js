import fs from 'fs';
import path from 'path';

export function configAction({ space }) {
  const { HOME } = process.env;

  if (!fs.existsSync(path.join(HOME, '.jsf/'))) {
    fs.mkdirSync(path.join(HOME, '.jsf/'));
  }

  fs.writeFileSync(path.join(HOME, '.jsf/config'), JSON.stringify({ space }, null, 2));
}

export function loadConfig() {
  const { HOME } = process.env;
  let config = {};

  if (fs.existsSync(path.join(HOME, '.jsf/config'))) {
    try {
      config = JSON.parse(fs.readFileSync(path.join(HOME, '.jsf/config')));
      // eslint-disable-next-line  no-empty
    } catch (e) {

    }
  }

  return config;
}

export default function (program) {
  program
    .command('config')
    .description('config jsom simple formatter')
    .option('-s, --space [value]', 'add space value to config file')
    .action(configAction);
}
