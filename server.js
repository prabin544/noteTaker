// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");
let db = require("./db/db.json");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 4000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use(express.json());

var noteData = require("./db/db.json");

// Displays all notes
app.get("/api/notes", function(req, res) {
    res.json(db);
});


//add user input, change it to json onbject and push in db array
app.post("/api/notes", function (req, res) {

  fs.readFile("db/db.json", "utf-8", function (err, data) {
    if (err) throw err
    let newData = JSON.parse(data);
    let newNote = { id: db.length + 1, title: req.body.title, text: req.body.text }
    newData.push(newNote);
    console.log(newData)
    fs.writeFile("db/db.json", JSON.stringify(newData), function (err, data) {
      if (err) throw err
      res.json(data);

      })
    })
  });

//delete object from db array
app.delete("/api/notes/:id", function (req, res) {
  fs.readFile("db/db.json", "utf-8", function (err, data) {
    if (err) throw err
    let newData = JSON.parse(data);
    let newNotes = newData.filter(note => note.id != req.params.id)
    fs.writeFile("db/db.json", JSON.stringify(newNotes), function (err, data) {
      if (err) throw err
      res.json(data);
      
    })
  })
  
})

// Basic route that sends the user first to the AJAX Page
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//Home page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html" ));
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
  