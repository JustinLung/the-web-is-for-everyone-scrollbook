const express = require('express')
const router = express.Router()
const { getBookById } = require('./../modules/api')


router

.get('/:id', (req, res, next)=>{
  getBookById(req.params.id)
  .then(data=>{    
    console.log(req.params.id)
    console.log(data)
    res.render('detail', {
      title: req.params.id
    })
  })
})

module.exports = router
