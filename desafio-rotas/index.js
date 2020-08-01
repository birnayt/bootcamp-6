/* eslint-disable no-unused-vars */
const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.set('view engine', 'njk')
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.render('form')
})

let age

app.post('/check', (req, res) => {
  age = req.body.age
  if (age >= 18) {
    res.redirect(`/major?age=${age}`)
  } else {
    res.redirect(`/minor?age=${age}`)
  }
})

const ageMiddleware = (req, res, next) => {
  if (req.query.age != '') {
    next()
  } else {
    res.redirect('/')
  }
}

app.get('/major', ageMiddleware, (req, res) => {
  res.render('major', { age })
})

app.get('/minor', ageMiddleware, (req, res) => {
  res.render('minor', { age })
})

app.listen(3000)
