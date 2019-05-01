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

const checkBasedOnName = async (name) => {
    return npmName(name).then(async (isAvailable) => {
        let isSquatter = await squatter(name);
        return {
            name: name,
            isAvailable,
            isSquatter
        }
    })
}


const checkPackage = async (input) => {
    const spinner = ora(`Checking available name ${input} for package on npmjs.com…`).start()

    const result = await checkBasedOnName(input).then(v => v)

    spinner.stop();

    showMessage(result)
	process.exit(1);
}

module.exports = (input) => checkPackage(input).then(_ => console.log("run")).catch(e => console.error("err",e))



