// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 4000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());




// Basic route that sends the user first to the AJAX Page
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });
  
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html" ));
  });

var noteData = require("./db/db.json");

// Displays all notes
app.get("/api/notes", function(req, res) {
    return res.json(noteData);
  });

// Create New Note - takes in JSON input
app.post("/api/notes", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newNote = req.body;
  
    // Using a RegEx Pattern to remove spaces from newNote
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newNote.routeName = newNote.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newNote);
  
    characters.push(newNote);
  
    res.json(newNote);
  });
  











app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  