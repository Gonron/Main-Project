const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')

// Facades
const employeeFacade = require('../facades/employeeFacade')
const storeFacade = require('../facades/storeFacade')

// Employees Page
router.get('/', ensureAuthenticated, async function(req, res) {
	let employees = await employeeFacade.getAllEmployees()
	res.render('employees', { employees })
})

// Specific Employee Page
router.get('/emp_id=:empId', ensureAuthenticated, async function(req, res) {
	let empId = req.params.empId
	let stores = await storeFacade.findStoresByEmployeeId(empId)
	let employee = await employeeFacade.findOneEmployeeById(empId)
	res.render('employee', { stores, employee })
})

// Update Employee Page
router.get('/emp_id=:empId/update', ensureAuthenticated, async function(req, res) {
	let employee = await employeeFacade.findOneEmployeeById(req.params.empId)
	res.render('updateEmployee', { employee })
})

// Update Employee Handle
router.post('/emp_id=:empId/update', ensureAuthenticated, async function(req, res) {
	const { name, title, email, address } = req.body
	let employee = await employeeFacade.findOneEmployeeById(req.params.empId)
	let errors = employeeFacade.employeeValidation(name, title, email, address)

	console.log(req.body)

	if (errors.length > 0) {
		res.render('updateEmployee', {
			errors,
			employee
		})
	} else {
		employeeFacade.updateEmployeeById(req.params.empId, name, title, email, address)
		req.flash('successMsg', `${name} has been updated`)
		res.redirect(`/employees/emp_id=${req.params.empId}`)
	}
})

module.exports = router
