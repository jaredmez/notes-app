const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

let notes = [
    {
      "id": 1,
      "content": "HTML is easy",
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
      "content": "testing",
      "date": "2021-09-25T22:03:18.813Z",
      "important": false
    },
    {
      "id": 5,
      "content": "yay! post method is sendin data to \"database\"",
      "date": "2021-09-25T22:03:48.134Z",
      "important": false
    },
    {
      "id": 6,
      "content": "Tems & Brent song !!!",
      "date": "2021-09-25T22:08:45.780Z",
      "important": false
    },
    {
      "id": 7,
      "content": "Masego",
      "date": "2021-09-25T22:13:53.506Z",
      "important": false
    },
    {
      "content": "no id added on client-side",
      "date": "2021-09-25T22:22:59.614Z",
      "important": false,
      "id": 8
    },
    {
      "content": "TEMS pt 2",
      "date": "2021-09-25T22:54:44.919Z",
      "important": false,
      "id": 9
    },
    {
      "content": "Music is life",
      "date": "2021-09-25T22:55:09.278Z",
      "important": false,
      "id": 10
    },
    {
      "content": "GT 45 UNC 22",
      "date": "2021-09-26T18:24:32.663Z",
      "important": true,
      "id": 11
    }
];

app.get('/', (req, res) => {
    console.log(req);
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
  const note = req.body;
  res.json(note);
  console.log('note posted');

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
