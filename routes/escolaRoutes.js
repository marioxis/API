const router = require('express').Router()

const Escola = require('../models/Escola')

//Create data
router.post('/', async (req, res) => {
    const { name, age, degree, parent, gender, approved } = req.body
    if(!name) {
        res.status(422).json({ error: 'O nome do aluno é obrigatorio!'})
    }
  
    const escola = {
      name,
      age,
      degree,
      parent,
      gender,
      approved,
    }
  
    try {
      await Escola.create(escola)
  
      res.status(201).json({ message: 'Aluno inserido no sistema com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })

//Read all data

router.get('/', async (req, res) => {
    try {
      const escola = await Escola.find()
  
      res.status(200).json(escola)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
})

//Read data for id
router.get('/:id', async (req, res) => {
    const id = req.params.id
  
    try {
      const escola = await Escola.findOne({ _id: id })
  
      if (!escola) {
        res.status(422).json({ message: 'Aluno não encontrado!' })
        return
      }
  
      res.status(200).json(escola)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
})

//Update data
router.put('/:id', async (req, res) => {
    const id = req.params.id
  
    const { name, age, degree, parent, gender, approved } = req.body
  
    const escola = {
      name,
      age,
      degree,
      parent,
      gender,
      approved,
    }
  
    try {
      const updatedEscola = await Escola.updateOne({ _id: id }, escola)
  
      if (updatedEscola.matchedCount === 0) {
        res.status(422).json({ message: 'Aluno não encontrado!' })
        return
      }
  
      res.status(200).json(escola)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })

  //Delete data
  router.delete('/:id', async (req, res) => {
    const id = req.params.id
  
    const escola = await Escola.findOne({ _id: id })
  
    if (!escola) {
      res.status(422).json({ message: 'Aluno não encontrado!' })
      return
    }
  
    try {
      await Escola.deleteOne({ _id: id })
  
      res.status(200).json({ message: 'Aluno removido com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })

module.exports = router
  
  