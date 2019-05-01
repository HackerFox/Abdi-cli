const path = require("path");
const program = require("commander");
const chalk = require("chalk");
const constants = require('./constants');
const Clean = require('./utils/clean');
const CheckNPMName = require('./utils/checkNPMName');

class Command {
    constructor(){
        this.baseDir = process.cwd();
        this.program = program;
    }

    version(){
        const pkg = require(path.resolve(__dirname, '../package.json'))
        this.program
            .version(pkg.version, '-v, --version')
    }

    clean(){
        this.program
        .command('open')
        .description('open webpack cache dir')
        .action(dir => {
          new Clean().buildDir();
        });
    }


    compile(){
        constants.LIST_COMMANDS.forEach(cmd => {
            if(this[cmd]){
                this[cmd].apply(this);
            } else {
                console.log(chalk.red(`The command [${cmd}] is not implemented!`));
            }
        })
    }

    parse(){
        this.program.parse(process.argv);
    }

    checkNPMName(){
        this.program
            .command("check:npm-name <name>")
            .action(function(name){
                CheckNPMName(name)
            })
    }

    run(){
        this.compile();
        this.version();
        this.parse();
    }
}

module.exports = Command;
