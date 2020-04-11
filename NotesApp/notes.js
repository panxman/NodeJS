const fs = require("fs");
const chalk = require("chalk");

// Load notes from the JSON file
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();

    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

// Save the notes to the JSON file
const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);

  fs.writeFileSync("notes.json", dataJSON);
};

// Add a new note and save it
const addNote = (title, body) => {
  const notes = loadNotes();
  //const duplicateNotes = notes.filter((note) => note.title === title);
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });

    saveNotes(notes);
    console.log(chalk.green.inverse("New note added!"));
  } else {
    console.log(
      chalk.red.inverse("Error: There is already a Note with the given Title.")
    );
  }
};

// Remove a note from the file
const removeNote = (title) => {
  const notes = loadNotes();
  // Filter out all notes with given title
  const notesToKeep = notes.filter((note) => note.title !== title);

  if (notesToKeep.length === notes.length) {
    console.log(chalk.bgRed("No Note found with the given title!"));
  } else {
    saveNotes(notesToKeep);
    console.log(chalk.bgGreen("Note with Title: '" + title + "' removed."));
  }
};

// List all notes
const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.blue.inverse("Your notes:\n"));

  notes.forEach((note) => {
    console.log(note.title);
    console.log();
  });
};

// Read a specific note
const readNote = (title) => {
  const notes = loadNotes();

  const note = notes.find((note) => note.title === title);

  if (note) {
    console.log(chalk.inverse(note.title + "\n"));
    console.log(note.body + "\n");
  } else {
    console.log(chalk.red.inverse("Note not found."));
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
