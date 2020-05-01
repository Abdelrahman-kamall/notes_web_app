const fs = require("fs")


/**
 * this function adds a new note to the stored notes
 * @param {*} title the title of the new note 
 * @param {*} body  the body of the new note 
 * @param {*} file_name the file name of the file of notes
 */
const add_note = function(title,body,file_name){
        const notes =get_notes(file_name)
        notes.push({
            title: title,
            body: body
        })
        save_notes(notes,file_name)

}
/**
 * this function loads the notes from the file and
 * @returns array of json objects ,if the file is empty 
 * or not created it returns empty array
 * @param {*} file_name the file name of the file of notes
 */
const get_notes = function(file_name){
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
const save_notes = function(notes,file_name){
    const notes_string = JSON.stringify(notes)
    fs.writeFileSync(file_name,notes_string)

}
module.exports = {
    add_note:add_note,
    get_notes:get_notes
}