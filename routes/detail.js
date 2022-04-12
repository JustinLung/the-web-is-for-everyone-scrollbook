const express = require('express')
const router = express.Router()
const { getBookById } = require('./../modules/api')

router

.get('/:id', async (req, res, next) => {
  const id = Number(req.params.id)
  const book = await getBookById(id)
  const nextBook = await getBookById(id + 1)
  const previousBook = await getBookById(id - 1)
  console.log(nextBook);
  res.render('detail', {
    title: id,
    next: nextBook,
    previous: previousBook,
    book: book
  })
})

module.exports = router
