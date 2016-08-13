#!/usr/bin/env node

let program = require('commander');

import addCommand from './addCommand';
import test from './commands/test';
import ls from './commands/ls';

addCommand(program, test);
addCommand(program, ls);

program.parse(process.argv); // notice that we have to parse in a
