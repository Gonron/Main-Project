const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EmployeeSchema = new Schema({})

const Employee = mongoose.model('Employee', EmployeeSchema)

module.exports = Employee
