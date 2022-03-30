const express = require('express')
const router = express.Router()
const { getAllBooks } = require('./../modules/api')

router

.get('/', (req, res) => {
    getAllBooks().then(data=>{
      console.log(data);
      res.render('index', {
          title: "Home",
          books: data
      })
    })
})

module.exports = router