import fs from 'fs';
import _path from 'path';

export function isJsonFile(path) {
  const isFile = fs.statSync(path).isFile();

  return isFile && /[.]json$/.test(path);
}

export function sortJsonProperties(json) {
  if (typeof json === 'object') {
    const keys = Object.keys(json).sort((a, b) => a.localeCompare(b));
    let obj = {};

    keys.forEach((key) => {
      const currentObject = sortJsonProperties(json[key]);

      obj[key] = currentObject;
    });

    return obj;
  }
  return json;
}

export function formatJsonFile(path) {
  const file = fs.readFileSync(path, 'utf8');
  const json = JSON.parse(file);
  const sortedJson = sortJsonProperties(json);
  const prettyJson = JSON.stringify(sortedJson, null, 2) + '\n';

  fs.writeFileSync(path, prettyJson, 'utf8');

  return console.log(`+  ${path}`);
}

export function listJsonFiles(path) {
  const files = fs.readdirSync(path);

  return files.filter((file) => isJsonFile(_path.join(path, file)));
}
