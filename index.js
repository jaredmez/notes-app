const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.static('build'));
app.use(cors());
app.use(express.json());

let notes = [
    {
      "id": 1,
      "content": "HTML & CSS can be tricky",
      "date": "2019-05-30T17:30:31.098Z",
      "important": true
    },
    {
      "id": 2,
      "content": "Browser can execute only JavaScript",
      "date": "2019-05-30T18:39:34.091Z",
      "important": false
    },
    {
      "id": 3,
      "content": "GET and POST are the most important methods of HTTP protocol",
      "date": "2019-05-30T19:20:14.298Z",
      "important": false
    },
    {
      "id": 4,
      "content": "Hello, from LA",
      "date": "2021-09-25T22:03:18.813Z",
      "important": false
    },

];

const generateId = () => {
  return Math.floor(Math.random() *1000);
}

app.get('/', (req, res) => {
    
    res.send('<h1>Whats up World!?</h1>');
})

app.get('/api/notes', (req, res) => {
    res.json(notes);
})

app.get('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    const note = notes.find(note => note.id == id);

    if (note) {
        res.json(note);
    }else {
        res.status(404).send('Resource D.N.E. per records');
    }
})

app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    notes = notes.filter(note => note.id !== id);
    res.status(204).end();

})

app.post('/api/notes', (req, res) => {
  const newNote = {...req.body, id: generateId() }
  notes = notes.concat(newNote);
  res.json(newNote);
})

app.put('/api/notes/:id', (req, res) => {
  const updatedNotes = notes.map(note => {
    if(note.id === req.body.id) {
      return req.body
    }
    return note;
  });
  notes = updatedNotes;
  res.send(req.body);
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=> console.log('Server running on port: 3001'));
