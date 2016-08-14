import fs from 'fs';
import _path from 'path';
import {
  formatJsonFile,
  listJsonFiles,
  isJsonFile
} from '../utils/json';

export function formatAction(path = '', { all, space }) {
  const fullPath = _path.join(process.cwd(), path);
  const state = { error: true };

  try {
    const stats = fs.statSync(fullPath);
    state.isDirectory = stats.isDirectory();
  } catch (e) {
    return console.log(e.message);
  }

  if (all && state.isDirectory) state.error = false;
  if (!all && isJsonFile(fullPath)) state.error = false;
  if (state.error) return console.log('Path error');

  let files = [];
  if (all) files = listJsonFiles(fullPath).map(file => _path.join(fullPath, file));
  if (!all) files = [fullPath];

  return files.forEach(file => formatJsonFile(file, { space }));
}

export default function (program) {
  program
    .command('format [path]')
    .description('format json file')
    .option('-a, --all', 'format all json files in directory')
    .option('-s, --space [value]', 'set value (number of spaces) of indent')
    .action(formatAction);
}
