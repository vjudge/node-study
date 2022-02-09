#! /usr/bin/env node

// #! 用于指定脚本的解释程序
// Node CLI 应用入口文件必须要有这样的文件头
// Linux 或者 macOS 系统下还需要修改此文件的读写权限为 755 (chmod 755 ss-cli.js)

const inquirer = require('inquirer');

const DESCRIPTION = {
    type: 'input',
    name: 'desc',
    message: 'description: '
}

const SELECT_MODE = {
    type: 'rawlist',
    message: 'Where Template mode?',
    name: 'mode',
    choices: ['sample', 'stable', 'develop'],
}

inquirer.prompt([
    DESCRIPTION,
    SELECT_MODE
]).then(function(answers) {
    console.log('Chosen Mode: ', answers.mode);
});
