#!/usr/bin/env node
const fs = require("fs");
const chalk = require("chalk");
const { program } = require("commander");
const pkg = require("../package.json");
const inquirerFn = require("../lib/meta");
const generate = require("../lib/generate");

program.version(pkg.version, '-v,--version');
program.command("init <dirname>").action(dirname => {
    if(fs.existsSync(dirname)) {
        return console.log(chalk.red(`文件夹 '${dirname}' 已存在`));
    }
    inquirerFn().then(answers => {
        generate(answers, dirname);
    })
})
program.arguments("<command>").action(cmd => {
    console.log(chalk.red(`error: unknown command '${cmd}'`));
    console.log("");
    program.outputHelp();
})

program.parse(process.argv);
