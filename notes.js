const fs = require('fs')
const chalk = require('chalk')



const readNote = (title) => {
    const notes = loadNotes()
    const selectedNote = notes.find((note) => note.title === title)

    if (selectedNote){
        console.log(chalk.inverse(selectedNote.title))
        console.log(selectedNote.body)
    } else {console.log(chalk.bgRed('Note not found'))}
}


const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New Note Added!')
    } else {
        console.log('Note Title Taken!')
    }
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes =  () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const removeNote =  (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter( (notes) => notes.title !== title)
    // const notesToKeep = notes.filter(function (notes){
    //     return notes.title !== title
    // })
    if (notesToKeep.length < notes.length ) {
        console.log(chalk.bgGreen('Note Removed'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.bgRed('No Note Found'))
    }
    
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.green('Your Notes!'))
    notes.forEach(notes => { console.log(notes.title)
        
    });
}




module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};

