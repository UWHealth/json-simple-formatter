#JSON simple formatter

## Synopsis
Custom command line utility for format json files.
## Installation
`$ npm install -g jsf`

## Commands
### ls
This command is usefull, if you want to see all json files in current working directory.
`$ jsf ls`
### Format
Format single json file or list of json files in current working directory. Format function sort json file content by keys in ascendant order.

#### Options
- `-a, --all` - format all json files in directory
- `-s, --space [value]` - set value (number of spaces) of indent

#### Examples

`$ jsf format test/utils/assets/file.json -s 4`

Format `file.json` in directory `test/utils/assets/` with space value equals to 4

`$ jsf format -a -s 4`

Format all files in current working directory with space value equals to 4

`$ jsf format -a`

Format all files in current working directory. Space value is taken from
  * `~/.jsf/config` file
  * set default space value to 2.

### config
