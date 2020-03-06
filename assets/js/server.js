const express = require("express");
var path = require("path");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('*', (req, res) => {
  console.log("index.html")
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get('/notes', (req, res) => {
  console.log("notes.html")
  res.sendFile(path.join(__dirname, "notes.html"));
});

app.get('/api/notes', (req, res) => {

});

app.post('/api/notes', (req, res) => {
    console.log(req);
});

app.delete('/api/notes/:id', (req, res) => {
    let id = req.params.id;
});






app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });