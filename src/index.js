#!/usr/bin/env node

let program = require('commander');

import addCommand from './addCommand';
import ls from './commands/ls';
import format from './commands/format';

addCommand(program, ls);
addCommand(program, format);

program.parse(process.argv); // notice that we have to parse in a
