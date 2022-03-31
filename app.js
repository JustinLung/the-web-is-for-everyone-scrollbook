const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3000

//Routes
const indexRoute = require('./routes/index')
const detailRoute = require('./routes/detail')

app.set('views', path.join(__dirname + '/views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '/public')))

app.use('/', indexRoute)
app.use('/book', detailRoute)

app.listen(PORT, () => console.log(`Listening on http://[::]:${PORT}`))
