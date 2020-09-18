// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");

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

app.get("/assets/js/index.js", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/assets/js/index.js" ));
});

app.get("/assets/css/styles.css", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/assets/css/styles.css" ));
});

var noteData = require("./db/db.json");

// Displays all notes
app.get("/api/notes", function(req, res) {
    return res.json(noteData);
});

// Create New Note - takes in JSON input
app.post("/api/notes", function(req, res) {

  var newNote = req.body;
  noteData.push(newNote);
  console.log(noteData);

});

//Delete Note
app.delete("/api/notes/:id", function(req, res) {
  console.log(req.params.id);
});
  
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
  