#! /usr/bin/env node
var program = require('commander')
var inquirer = require('inquirer')
var pkg = require('../package.json')
var path = require('path')
var fse = require('fs-extra')

program
  .version(pkg.version, '-v, --version')
  .option('-i --init [name]', 'init a project', 'grace-sdk-project')

program
  .parse(process.argv)

if (program.init) {
  var projectPath = path.resolve(program.init)
  var projectName = path.basename(program.init)
  var tmpPath = path.join(__dirname, '../template')
  console.log('start to init project in ', projectPath)
  if (fse.existsSync(projectPath)) {
    inquirer.prompt([ { 
      type: 'confirm', 
      name: 'ok', 
      message: 'Target directory exists. Continue?', 
      default: true 
    }]).then(res => {
      if (res.ok) {
        next()
      } else {
        return
      }
    })
  } else {
    fse.mkdirSync(projectPath)
    next()
  }
  function next () {
    fse.copy(tmpPath, projectPath)
  }
}
