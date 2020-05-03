const fs = require("fs")
const chalk = require("chalk")

/**
 * this function adds a new note to the stored notes
 * if the title already exist id doesnt add it
 * @param {*} title the title of the new note 
 * @param {*} body  the body of the new note 
 * @param {*} file_name the file name of the file of notes
 */
const add_note = (title,body,file_name) =>{
    //we could use filter also but wanted to test another way
        const notes =get_notes(file_name)
        var flag = true
        for(i=0;i<notes.length;i++){

            if(notes[i].title === title){
                flag = false
                console.log(chalk.red.inverse("This title already exists, please choose another title "))
                break
            }

        }
        if(flag){
            console.log(chalk.green.inverse("new note added to file  "))

            notes.push({
                title: title,
                body: body
            })
            save_notes(notes,file_name)

        }

}

/**
 * this function loads the notes from the file and
 * @returns array of json objects ,if the file is empty 
 * or not created it returns empty array
 * @param {*} file_name the file name of the file of notes
 */
const get_notes = (file_name) =>{
    try{
        const buffer = fs.readFileSync(file_name)
        const notes = buffer.toString()
        return JSON.parse(notes)
    }catch(e){
        return []
    }
}
/**
 * this function stores all th objects in the file
 * @param {*} notes the json array of objects
 * @param {*} file_name the file name of the file of notes
 */
const save_notes = (notes,file_name)=> fs.writeFileSync(file_name,JSON.stringify(notes))

const remove_note = (title,file_name)=>{
    var notes = get_notes(file_name)

    //method1
    var flag = true
        for(i=0;i<notes.length;i++){

            if(notes[i].title === title){
                flag = false
                notes.splice(i,1)
                console.log(chalk.green.inverse("removed note "+title))
                save_notes(notes,file_name)
                break
            }
        }
    if(flag){
        console.log(chalk.red.inverse("no such title exist"))
    }
    /*method 2
     const len =notes.length
     notes = notes.filter( (curr_note) => !(curr_note.title === title))
        

    
    if(len === notes.length){
        console.log("no such title exist")
    }else{
        save_notes(notes,file_name)
        console.log("removed note "+title)
    }*/
    
    
}
module.exports = {
    add_note:add_note,
    get_notes:get_notes,
    remove_note:remove_note
}