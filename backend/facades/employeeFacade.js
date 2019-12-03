// Employee model
const { Employee } = require('../models/Employee')

function getAllEmployees() {
	return Employee.find({}).exec()
}

function addEmployee(name, title, email, address) {
	return (newEmployee = Employee({ name, title, email, address }).save())
}

function findOneEmployeeByName(name) {
	return Employee.findOne({ name }).exec()
}

function findEmployeesByName(name) {
	return Employee.find({ name: new RegExp(name, 'i') }).exec()
}

function findOneEmployeeByEmail(email) {
	return Employee.findOne({ email }).exec()
}

function findEmployeesByEmail(email) {
	return Employee.find({ email: new RegExp(email, 'i') }).exec()
}

function findOneEmployeeById(employeeId) {
	return Employee.findById({ _id: employeeId }).exec()
}

function updateEmployeeById(employeeId, name, title, email, address) {
	return Employee.findOneAndUpdate(
		{ _id: employeeId },
		{ $set: { name, title, email, address } },
		{ runValidators: true }
	).exec()
}

function deleteEmployeeById(employeeId) {
	return Employee.deleteOne({ _id: employeeId }).exec()
}

function employeeValidation(name, title, email, address) {
	let errors = []

	// Check required fields
	if (!name || !title || !email || !address) {
		errors.push({ msg: 'Please fill in all fields' })
	}

	//

	return errors
}

module.exports = {
	getAllEmployees,
	addEmployee,
	findOneEmployeeByName,
	findEmployeesByName,
	findOneEmployeeByEmail,
	findEmployeesByEmail,
	findOneEmployeeById,
	updateEmployeeById,
	deleteEmployeeById,
	employeeValidation
}
