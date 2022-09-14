const mongoose = require("mongoose")
const esquema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    degree: {
        type: Number,
        required: true,
    },
    parent: {
        type: String,
        required: true,
        min: 0
    },
    gender: {
        type: String,
        required: true
    },
    approved: {
        type: Boolean,
        required: true
    },

    turma: {
        type: mongoose.ObjectId, 
        ref: 'Turma',
        required: true
    }
})

module.exports = mongoose.model('Aluno', esquema, 'aluno')
