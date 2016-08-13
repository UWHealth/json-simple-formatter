import { printArray } from '../utils/print';
import listJsonInDirectory from '../utils/listJsonInDirectory';

function action() {
  const pwd = process.cwd();
  const jsonFiles = listJsonInDirectory(pwd);
  printArray(jsonFiles);
}

export default function (program) {
  program
    .command('ls')
    .description('list all json files in directory')
    .action(action);
}
