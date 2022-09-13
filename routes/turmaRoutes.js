const router = require('express').Router()

const Turma = require('../models/Turma')

//Create data
router.post('/', async (req, res) => {
    const { teacherName, totalStudents, totalCourses, coursesCredits, totalHours, courseCoordinator } = req.body
    
    const turma = { teacherName, totalStudents, totalCourses, coursesCredits, totalHours, courseCoordinator }
  
    try {
      await Turma.create(turma)
  
      res.status(200).json({ message: 'Dados da turma do aluno inseridos no sistema com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })

//Read all data

router.get('/', async (req, res) => {
    try {
      const turma = await Turma.find()
  
      res.status(200).json(turma)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
})

//Read data for id
router.get('/:id', async (req, res) => {
    const id = req.params.id
  
    try {
      const turma = await Turma.findOne({ _id: id })

      if (!turma) {
        res.status(422).json({ message: 'Turma não encontrada!' })
        return
      }
  
      res.status(200).json(turma)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
})

//Update data
router.put('/:id', async (req, res) => {
    const id = req.params.id
  
    const { teacherName, totalStudents, totalCourses, coursesCredits, totalHours, courseCoordinator } = req.body
  
    const turma = { teacherName, totalStudents, totalCourses, coursesCredits, totalHours, courseCoordinator }
  
    try {
      const updatedTurma = await Turma.updateOne({ _id: id }, turma)
  
      if (updatedTurma.matchedCount === 0) {
        res.status(422).json({ message: 'Dados da turma do aluno não encontrado!' })
        return
      }
  
      res.status(200).json({message: 'Dados da turma alterados com sucesso'})
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })

  //Delete data
  router.delete('/:id', async (req, res) => {
    const id = req.params.id
  
    const turma = await Turma.findOne({ _id: id })
  
    try {
      await Turma.deleteOne({ _id: id })
  
      res.status(200).json({ message: 'Dados da turma do aluno removido com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })

module.exports = router