const path = require("path");
const program = require("commander");
const chalk = require("chalk");
const constants = require('./constants');


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


    compile(){
        constants.LIST_COMMANDS.forEach(cmd => {
            console.log(cmd);
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

    run(){
        this.compile();
        this.version();
        this.parse();
    }
}

module.exports = Command;
