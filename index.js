import Vorpal from 'vorpal';
import fs from 'fs';
import path from 'path';

function autoCompleteNames(candidates, prefix, input) {
  return candidates.filter(value => path.join(prefix, value).indexOf(input) === 0);
}

function findCandidates(pathToDirectory) {
  const dirs = fs.readdirSync(pathToDirectory);
  return dirs
    .map(value => {
      if (fs.statSync(path.join(pathToDirectory, value)).isDirectory()) {
        return value + '/';
      }
      return value;
    });
}

function prettifyJson(pathToJson) {
  logData(path.join(pwd, pathToJson));
  const json = fs.readFileSync(path.join(pwd, pathToJson), 'utf8');
  console.log(JSON.stringify(json, null, 4));
  fs.writeFileSync(path.join(pwd, pathToJson), JSON.stringify(json, null, 2));
}

const vorpal = Vorpal();
const pwd = process.cwd();

function logData(data) {
  fs.appendFileSync(pwd + '/tmp.txt', data + '\n');
}

vorpal
  .command('prettify [path]', 'Make you json file pretty')
  .autocomplete({
    data: function (input) {
      let pathPrefix = input;
      if (pathPrefix[pathPrefix.length - 1] !== '/') {
        pathPrefix = input.split('/').slice(0, -1).join('/');
        if (pathPrefix)
          pathPrefix += '/';
      }
      const candidates = findCandidates(path.join(pwd, pathPrefix));
      const names = autoCompleteNames(candidates, pathPrefix, input);
      logData('names');
      logData(input);
      logData(pathPrefix);
      logData(candidates);
      logData(names);
      return names;
    }
  })
  .action(function (args, callback) {
    const pathToJson = args.path;
    console.log('pathToJson');
    console.log(pathToJson);
    prettifyJson(pathToJson, {});
    callback();
  });

vorpal
  .command('pwd', 'Get current working directory')
  .action(function (args, callback) {
    this.log(pwd);
    callback();
  });

vorpal
  .delimiter('jsf$')
  .show();
