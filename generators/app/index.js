'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const fs = require('fs');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to ' + chalk.red('generator-zcy-front-starter-kit') + ' generator!'
    ));

    const prompts = [
      {
        type    : 'input',
        name    : 'repo',
        message : '请输入Git仓库名称(不能有空格和大写字母)',
        default : this.env.cwd.split('/').pop() // Default 当前目录名
      },
      {
      type    : 'input',
      name    : 'product',
      message : '请输入产品中文名称（如:网超系统）',
      default : '政采云网超系统'
    }, {
      type    : 'input',
      name    : 'fe',
      message : '请输入项目负责前端的花名，多人用逗号隔开',
      default : '大海，布凡，余诺'
    }, {
      type    : 'input',
      name    : 'rd',
      message : '请输入项目合作后端的花名，多人用逗号隔开',
      default : '石秀，白杨'
    }, {
      type    : 'input',
      name    : 'pd',
      message : '请输入项目合作产品的花名，多人用逗号隔开',
      default : '一帆'
    }, {
      type    : 'input',
      name    : 'ue',
      message : '请输入项目合作设计师的花名，多人用逗号隔开',
      default : '东格'
    }];


    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    let compilePath = this.templatePath(),
      files = fs.readdirSync(compilePath);

    this.fs.copyTpl(
      this.templatePath(),
      this.destinationPath(),
      this.props
    )
    this.fs.copy(
      this.templatePath('./.*'),
      this.destinationRoot()
    )
    this.fs.copyTpl(
      this.templatePath('.babelrc'),
      this.destinationPath('.babelrc'),
      this.props
    )
  }

  install () {
    this.npmInstall();
    this.on('end', function(){
      this.log.ok('React工程初始化完成，你可以执行' + chalk.green(' npm start ') + '开启dev server 查看示例')
    })
  }
};