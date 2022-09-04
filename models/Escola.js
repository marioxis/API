const mongoose = require('mongoose')

const Escola = mongoose.model('Escola', {
    name: String,
    age: Number,
    degree: Number,
    parent: String,
    gender: String,
    approved: Boolean,
})

module.exports = Escola