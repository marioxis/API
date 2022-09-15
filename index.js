// initial config 
const express = require('express')
const mongoose = require('mongoose')
const app = express()

const Aluno = require('./models/Aluno')
const Turma = require('./models/Turma')

// Swagger
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

//Definindo rota para a documentação
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//read JSON
app.use(
  express.urlencoded({
    extended: true
  }),
)

app.use(express.json())

// routes from API
const alunoRoutes = require('./routes/alunoRoutes')
app.use('/aluno', alunoRoutes)

const turmaRoutes = require('./routes/turmaRoutes')
app.use('/turma', turmaRoutes)


app.get('/', (req, res) => {
  res.json({ message: 'Bem-vindo ao sistema de gestão escolar' })
})
//conexao com a porta e mongodb
mongoose
  .connect('mongodb+srv://grupo5:grupo5@apigrupo5.lovbsnn.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
      console.log('Conectou ao banco de dados!')
      console.log('App iniciada')
      app.listen(3000)
    })
     .catch((err) => console.log(err))