const notesRouter = require('express').Router()
const { update } = require('../models/note')
const Note = require('../models/note')


notesRouter.get('/', async (req, res) => {
  const notes = await Note.find()
  res.json(notes)
})

notesRouter.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const note = await Note.findById(id)
    if (note) {
      res.json(note);
    } else {
      res.status(404).end()
    }
  } catch(e) {
    next(e);
  }

})

notesRouter.delete('/:id', async (req, res, next) => {
  try {
    await Note.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } catch(e) {
    next(e);
  }
})

notesRouter.post('/', async (req, res, next) => {
  const body = req.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  try {
    const savedNote = await note.save()
    res.json(savedNote)
  } catch(exception) {
    next(exception);
  }
})

notesRouter.put('/:id', async (req, res, next) => {
    const body = req.body

    const note = {
        content: body.content,
        important: body.important
    }
  try {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, note, {new: true})
    res.json(updatedNote)
  } catch(exception) {
    next(exception);
  }

})

module.exports = notesRouter