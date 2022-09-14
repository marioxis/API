const router = require('express').Router()

const Aluno = require('../models/Aluno')

//Create data
router.post('/', async (req, res) => {
    const { name, age, degree, parent, gender, approved, turma } = req.body
    if(!name) {
        res.status(422).json({ error: 'O nome do aluno é obrigatorio!'})
    } else {

    const aluno = {
      name,
      age,
      degree,
      parent,
      gender,
      approved,
      turma
    }
  
    try {
      const aluno = await Aluno.create(req.body)
      res.status(200).json({message: 'Aluno inserido com sucesso!'})
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  }
  })

//Read all data

router.get('/', async (req, res) => {
    try {
      const aluno = await Aluno.find().populate('turma')
  
      res.status(200).json(aluno)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
})

//Read data for id
router.get('/:id', async (req, res) => {
    const id = req.params.id
  
    try {
      const aluno = await Aluno.findOne({ _id: id })
  
      if (!aluno) {
        res.status(422).json({ message: 'Aluno não encontrado!' })
        return
      }
  
      res.status(200).json(aluno)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
})

//Update data
router.put('/:id', async (req, res) => {
    const id = req.params.id
  
    const { name, age, degree, parent, gender, approved, turma } = req.body
  
    const aluno = {
      name,
      age,
      degree,
      parent,
      gender,
      approved,
      turma
    }
  
    try {
      const updatedAluno = await Aluno.updateOne({ _id: id }, aluno)
  
      if (updatedAluno.matchedCount === 0) {
        res.status(422).json({ message: 'Aluno não encontrado!' })
        return
      }
  
      res.status(200).json({message: 'Aluno alterado com sucesso'})
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })

  //Delete data
  router.delete('/:id', async (req, res) => {
    const id = req.params.id
  
    const aluno = await Aluno.findOne({ _id: id })
  
    if (!aluno) {
      res.status(422).json({ message: 'Aluno não encontrado!' })
      return
    }
  
    try {
      await Aluno.deleteOne({ _id: id })
  
      res.status(200).json({ message: 'Aluno removido com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })

module.exports = router