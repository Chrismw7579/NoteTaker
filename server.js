const express = require("express");
const fs = require('fs');
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));



app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get('/api/notes', (req, res) => {
  
  if (fs.existsSync('db.json')) {
    fs.readFile('db.json', (err, data) => {
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

  if (fs.existsSync('db.json')) {
   
    fs.readFile('db.json', (err, data) => {
      if (err) {
        throw err;
      }
      let parsedDAta = JSON.parse(data);
      parsedDAta.notes.push(req.body);

      fs.writeFile('db.json', JSON.stringify(parsedDAta), (err) => {
        if (err) {
          throw err;
        }
        console.log('File written');
      })
    });

  } else {
    data.notes.push(req.body);

    fs.appendFile('db.json', JSON.stringify(data), (err) => {
      if (err) {
        throw err;
      }
      console.log('File written');
    })
  }
});

app.delete('/api/notes/:id', (req, res) => {
  let id = req.params.id;
  console.log(id);
  fs.readFile('db.json', (err, data) => {
    if (err) {
      throw err;
    }
    let parsedDAta = JSON.parse(data).notes;
    console.log(parsedDAta);
    parsedDAta.splice(id,1);
    console.log(parsedDAta);
    
  });

});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});