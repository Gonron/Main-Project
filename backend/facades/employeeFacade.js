// Employee model
const { Employee } = require('../models/Employee')

function getAllEmployees() {
	return Employee.find({}).exec()
}

function addEmployee(name, title, email, address) {
	return (newEmployee = Employee({ name, title, email, address }).save())
}

function findEmployeeByName(name) {
	return Employee.findOne({ name }).exec()
}

function findEmployeeByEmail(email) {
	return Employee.findOne({ email }).exec()
}

function findEmployeeById(employeeId) {
	return Employee.findById({ _id: employeeId }).exec()
}

function deleteEmployeeById(employeeId) {
	return Employee.deleteOne({ _id: employeeId }).exec()
}

module.exports = {
	getAllEmployees,
	addEmployee,
	findEmployeeByName,
	findEmployeeByEmail,
	findEmployeeById,
	deleteEmployeeById
}
