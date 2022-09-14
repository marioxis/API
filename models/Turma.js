const mongoose = require("mongoose")
const esquema = mongoose.Schema({
    teacherName: {
        type: String,
        required: true
    },
    totalStudents: {
        type: Number,
        required: true
    },
    totalCourses: {
        type: Number,
        required: true
    },
    coursesCredits: {
        type: Number,
        required: true
    },
    totalHours: {
        type: Number,
        required: true
    },
    courseCoordinator: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Turma', esquema, 'turma')