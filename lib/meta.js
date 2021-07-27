const inquirer = require("inquirer");
function inquirerFn (){
    return inquirer.prompt([
        {
            type: "list",
            name: "template",
            message: "选择项目模板：",
            choices: ["spa", "spa-doc", "lib"]
        },
        {
            type: "input",
            name: "name",
            message: "输入项目名称："
        },
        {
            type: "input",
            name: "description",
            message: "输入项目描述："
        }
    ])
}

module.exports = inquirerFn;