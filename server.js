const express = require("express");
const fs = require('fs');
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const dbFilePath = 'db/db.json';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get('/api/notes', (req, res) => {
  
  if (fs.existsSync(dbFilePath)) {
    
    fs.readFile(dbFilePath, (err, data) => {
      if (err) {
        throw err;
      }
      
      let parsedDAta = JSON.parse(data).notes;
      
      res.send(parsedDAta);
    });
  }
});

app.post('/api/notes', (req, res) => {
  
  data = {
    notes: []
  }

  if (fs.existsSync(dbFilePath)) {
   
    fs.readFile(dbFilePath, (err, data) => {
      if (err) {
        throw err;
      }
      let parsedDAta = JSON.parse(data);

      let obj = {
        title: req.body.title,
        text: req.body.text,
        id: parsedDAta.notes.length
      }

      parsedDAta.notes.push(obj);

      write(parsedDAta);
    });

  } else {

    let obj = {
      title: req.body.title,
      text: req.body.text,
      id: 0
    }

    data.notes.push(obj);

    write(data);
  }
});

app.delete('/api/notes/:id', (req, res) => {
  let id = req.params.id;
  
  fs.readFile(dbFilePath, (err, data) => {
    if (err) {
      throw err;
    }
    let parsedDAta = JSON.parse(data);

    parsedDAta.notes.splice(id,1);
    
    // rewrite the file after resetting all the id's
    for (let i = 0; i < parsedDAta.notes.length; i++) {
      parsedDAta.notes[i].id = i;
    }

    write(parsedDAta);
  });

});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

const write = data => {
  fs.writeFile(dbFilePath, JSON.stringify(data), (err) => {
    if (err) {
      throw err;
    }
    console.log('File written');
  });
}