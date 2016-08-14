#!/usr/bin/env node

let program = require('commander');

import addCommand from './utils/addCommand';
import ls from './commands/ls';
import format from './commands/format';
import config from './commands/config';

addCommand(program, ls);
addCommand(program, format);
addCommand(program, config);

program.parse(process.argv);
