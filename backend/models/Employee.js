const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EmployeeSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	title: {
		type: String,
		enum: ['Service Konsulent', 'Salgs Konsulent', 'Team Leader'],
		required: true
	},
	email: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	}
})

const Employee = mongoose.model('Employee', EmployeeSchema)

module.exports = { Employee, EmployeeSchema }
