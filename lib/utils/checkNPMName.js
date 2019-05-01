const chalk = require('chalk')
const squatter = require('squatter');
const npmName = require('npm-name');
const ora = require('ora'); 
const logSymbols = require("log-symbols");

const showMessage = (pkg) => {
	const styledName = chalk.bold(pkg.name);
	if (pkg.isAvailable) {
		console.log(`${logSymbols.success} ${styledName} is available`);
	} else if (pkg.isSquatter) {
		console.log(`${logSymbols.warning} ${styledName} is squatted`);
	} else {
		console.log(`${logSymbols.error} ${styledName} is unavailable`);
	}
}
const checkSquatted = async (package) => {
    if(!package.isAvailable){
        let result = await squatter(package.name)
    }

    return package
}

const checkName = async (package) => {
    package.isa = await npmName(package.name)
    return checkSquatted(package)
}
const checkPackage = async (input) => {
    const spinner = ora(`Checking available name ${input} for package on npmjs.com…`).start()

    let result = await checkName({ isAvailable: true, isSquatter: false, name: input})

    spinner.stop();
    showMessage(result)

	process.exit(1);
}

module.exports = (input) => checkPackage(input).then(_ => _).catch(e => console.error("err",e))



