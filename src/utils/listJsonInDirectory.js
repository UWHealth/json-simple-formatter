import fs from 'fs';

export default (path) => {
  const files =  fs.readdirSync(path);
  return files.filter((file) => /[.]json$/.test(file));
};
