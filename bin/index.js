#!/usr/bin/env node
const program = require('commander')

// Run Commander
const command = require('../lib/command');

// Say Hello to our abdi dalem
program
    .command("halo")
    .description("say hello to our assistant")
    .action(function(){
        command();
    });

// allow commander to parse `process.argv`
program.parse(process.argv);