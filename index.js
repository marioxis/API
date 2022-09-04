// initial config 
const express = require('express')
const mongoose = require('mongoose')
const app = express()

const Escola = require('./models/Escola')

//read JSON
app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

// routes from API
const escolaRoutes = require('./routes/escolaRoutes')

app.use('/escola', escolaRoutes)


app.get('/', (req, res) => {
  res.json({ message: 'Esta funcionando o URL!' })
})

//port

mongoose
  .connect(
    'mongodb+srv://apirest:apirest@cluster0.glqnlcs.mongodb.net/?retryWrites=true&w=majority',
  )
  .then(() => {
    console.log('Conectou ao banco de dados!')
    app.listen(3000)
  })
  .catch((err) => console.log(err))