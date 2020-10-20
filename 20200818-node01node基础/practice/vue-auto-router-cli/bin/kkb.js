#!/usr/bin/env node
console.log('cli...');

const program = require('commander')
program.version(require('../package').version)

program.command('init <name>')
    .description('init project')
    .action(name => {
        console.log('init ' + name);

    })
    .action(require('../lib/init'))

program.command('refresh')
    .description('refresh routers...')
    .action(require('../lib/refresh'))

program.parse(process.argv)