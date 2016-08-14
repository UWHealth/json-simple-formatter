import { printArray } from '../utils/print';
import { listJsonFiles } from '../utils/json';

export function lsAction() {
  const pwd = process.cwd();
  const jsonFiles = listJsonFiles(pwd);

  printArray(jsonFiles);
}

export default function (program) {
  program
    .command('ls')
    .description('list all json files in directory')
    .action(lsAction);
}
