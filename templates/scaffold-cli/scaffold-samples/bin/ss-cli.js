#! /usr/bin/env node

// #! 用于指定脚本的解释程序
// Node CLI 应用入口文件必须要有这样的文件头
// Linux 或者 macOS 系统下还需要修改此文件的读写权限为 755 (chmod 755 ss-cli.js)

console.log('starting...');

const { Command } = require('commander');
const pack = require('../package.json');

const program = new Command();

program
    .version(pack.version)
    .usage('<command> [options]')
    .command('create <project_name>', 'create scaffold template.')
    .command('init', 'init scaffold template.')
    .parse(process.argv);


