const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')


notesRouter.get('/', async (req, res) => {
  const notes = await Note.find().populate('user', {username: 1, name: 1})
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
  console.log(body)

  const user = await User.findById(body.userId)
  console.log('user is')
  console.log(user);

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
    user: user._id
  })

  try {
    const savedNote = await note.save()
    console.log(savedNote._id)
    // user.notes = user.notes.concat(savedNote._id)
    // console.log(user.notes)
    // await user.save()

    const newNotesArr = user.notes.concat(savedNote._id)
    console.log(newNotesArr)

    User.findOneAndUpdate({_id: user._id}, {notes: newNotesArr}, (err, doc) => {
      if( err) {
      console.log(err)}
      else {
        console.log(doc)
      }
    });

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