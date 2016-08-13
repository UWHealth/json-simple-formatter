import fs from 'fs';
import _path from 'path';
import listJsonInDirectory from '../utils/listJsonInDirectory';

function sortJsonProperies(json) {
  if (typeof json == 'object') {
    const keys = Object.keys(json).sort((a, b) => a.localeCompare(b));
    let obj = {};
    keys.forEach((key) => {
      const currentObject = sortJsonProperies(json[key]);
      obj = { ...obj, [key]: currentObject };
    });
    return obj;
  }
  return json;
}

function formatJson(path) {
  const file = fs.readFileSync(path, 'utf8');
  const json = JSON.parse(file);
  const sortedJson = sortJsonProperies(json);
  const prettyJson = JSON.stringify(sortedJson, null, 2);
  fs.writeFileSync(path, prettyJson, 'utf8');
  console.log(`+  ${path}`);
}

function action(path = '', { all }) {
  const fullPath = _path.join(process.cwd(), path);
  console.log(fullPath);
  const state = { error: true };
  try {
    const stats = fs.statSync(fullPath);
    state.isFile = stats.isFile();
    state.isDirectory = stats.isDirectory();
  } catch (e) {
    return console.log(e.message);
  }

  if (all && state.isDirectory) state.error = false;
  if (!all && state.isFile && /.json$/.test(file)) state.error = false;
  if (state.error) return console.log('Path error');

  let files = [];
  if (all) files = listJsonInDirectory(fullPath).map(file => _path.join(fullPath, file));
  if (!all) files = [path];
  
  files.forEach(file => formatJson(file));
}

export default function(program) {
  program
    .command('format [path]')
    .description('format json file')
    .option('-a, --all','format all json files in directory')
    .action(action);
}
