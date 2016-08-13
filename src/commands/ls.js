import fs from 'fs';
import { printArray } from '../utils/print';

function listJsonInDirectory(path) {
  const files =  fs.readdirSync(path);
  return files.filter((file) => /json$/.test(file));
}

function action(command, option) {
  const pwd = process.cwd();
  const jsonFiles = listJsonInDirectory(pwd);
  printArray(jsonFiles);
}

export default function(program) {
  program
    .command('ls')
    .description('list all json files in directory')
    .option('-o, --option','we can still have add\'l options')
    .action(action);
}
