/* eslint-env node, mocha */
import _path from 'path';
import { expect } from 'chai';
import {
  isJsonFile,
  listJsonFiles
} from '../../src/utils/json';

describe('json utils', () => {
  describe('isJsonFile', () => {
    it('should recognize json file', () => {
      const path = _path.join(__dirname, 'assets/file.json');

      // eslint-disable-next-line no-unused-expressions
      expect(isJsonFile(path)).to.be.true;
    });

    it('should skip folder', () => {
      const path = _path.join(__dirname, 'assets/folder.json');

      // eslint-disable-next-line no-unused-expressions
      expect(isJsonFile(path)).to.be.false;
    });

    it('should skip not json file', () => {
      const path = _path.join(__dirname, 'assets/not.json.file');

      // eslint-disable-next-line no-unused-expressions
      expect(isJsonFile(path)).to.be.false;
    });
  });

  describe('listJsonFiles', () => {
    it('should return list of json files names', () => {
      const list = ['file.json'];
      const path = _path.join(__dirname, 'assets');

      expect(listJsonFiles(path)).to.deep.equal(list);
    });
  });
});
