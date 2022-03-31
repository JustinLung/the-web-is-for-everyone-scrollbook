const express = require('express')
const router = express.Router()

router

.get('/:id', (req, res, next)=>{
  res.render('detail', {
    title: req.params.id
  })
})

module.exports = router