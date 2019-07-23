const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');

// Customize Yargs version

yargs.version('1.1.0');


// create add command

yargs.command({
    command : 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Body of your note',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.addNote(argv.title, argv.body)
    }
});

// create remove command

yargs.command({
    command: 'remove',
    describe: 'remove a note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler (argv) {
        notes.removeNote(argv.title);
    }
});

// read note command
yargs.command({
    command: 'read',
    describe: 'Reading your notes',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.readNote(argv.title)
    }
});

// list notes
yargs.command({
    command: 'list',
    describe: 'listing your notes',
    handler: function () {
        notes.listNotes()
    }
});


yargs.parse();

// add, remove, read, list

// console.log(yargs.argv);