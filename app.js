const yargs = require("yargs")
const notes = require("./notes")
const chalk = require("chalk")
yargs.version("1.1.0")

yargs.command({
    command:"add",
    describe:"add a new note",
    handler: function(argv){
        console.log(chalk.blue.inverse("adding a new  note with title : " + argv.title 
        +" and body : " +  argv.body))
        notes.add_note(argv.title,argv.body,"notes_file.json")
    },
    builder:{
        title:{
            describe:"the title of the note to be added",
            demandOption:true,
            type:"string"
        },
        body:{
            describe:"the body of the note to be added",
            demandOption:true,
            type:"string"
        }
    }
})
yargs.command({
    command:"remove",
    describe:"remove the specified note",
    handler:function(argv){
            console.log(chalk.blue.inverse("removing a note with tite " + argv.title))
            notes.remove_note(argv.title,"notes_file.json")

    },
    builder:{
        title:{
            describe:"remove the note with the specified title",
            demandOption:true,
            type:"string"

        }
    }

})
yargs.parse()