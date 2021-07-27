const ora = require("ora");
const chalk = require("chalk");
const fs = require("fs");
const Promise = require("bluebird");
const download = Promise.promisify(require("download-git-repo"));
const spinner = ora("下载模板...");

function generate({template, name, description}, dirname) {
    let gitRepoUrl = `https://github.com:Lee-Xin/templates#${template}`;
    spinner.start();
    download(gitRepoUrl, dirname, {clone: false}).then(() => {
        console.log(chalk.green("模板下载成功"));
        try {
            const pkg = process.cwd() + `/${dirname}/package.json`;
            const content = JSON.parse(fs.readFileSync(pkg, "utf8"));
            content.name = name;
            content.description = description;
            const result = JSON.stringify(content);
            fs.writeFileSync(pkg, result);
        }catch (e) {
            console.log(chalk.red("模板解析失败"));
            console.log(e);
            deleteFolder(dirname);
        }
    }).catch(err => {
        console.log(chalk.red("模板下载失败"));
        console.log(err);
    }).finally(() => {
        spinner.stop();
    });
}

function deleteFolder (path) {
    let files = [];
    if(fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach((file, index) => {
            const currPath = `${path}/${file}`;
            if(fs.statSync(currPath).isDirectory()) {
                deleteFolder(currPath);
            } else {
                fs.unlinkSync(currPath);
            }
        });
        fs.rmdirSync(path);
    }
}

module.exports = generate;