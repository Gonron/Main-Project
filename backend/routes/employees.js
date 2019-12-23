const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')

// Facades
const employeeFacade = require('../facades/employeeFacade')
const storeFacade = require('../facades/storeFacade')
const googleApiFacade = require('../facades/googeApiFacade')

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
	let empId = req.params.empId
	let employee = await employeeFacade.findOneEmployeeById(empId)
	let errors = await employeeFacade.employeeValidation(name, title, email, address, empId)

	if (errors.length > 0) {
		res.render('updateEmployee', {
			errors,
			employee
		})
	} else {
		employeeFacade.updateEmployeeById(empId, name, title, email, address)
		req.flash('successMsg', `${name} has been updated`)
		res.redirect('/employees')
	}
})

// Add Employee Page
router.get('/addEmployee', ensureAuthenticated, async function(req, res) {
	res.render('addEmployee')
})

// Add Employee Handle
router.post('/addEmployee', ensureAuthenticated, async function(req, res) {
	const { name, title, email, address } = req.body
	let errors = await employeeFacade.employeeValidation(name, title, email, address)

	if (errors.length > 0) {
		res.render('addEmployee', {
			errors,
			name,
			title,
			email,
			address
		})
	} else {
		employeeFacade.addEmployee(name, title, email, address)
		req.flash('successMsg', `${name} has been added`)
		res.redirect('/employees')
	}
})

// Delete Employee Handle
router.get('/emp_id=:empId/delete', ensureAuthenticated, async function(req, res) {
	let empId = req.params.empId
	let employee = await employeeFacade.findOneEmployeeById(empId)
	await employeeFacade.deleteEmployeeById(empId)

	let delEmp = await employeeFacade.findOneEmployeeById(empId)
	if (!delEmp) {
		req.flash('successMsg', `${employee.name} has been deleted`)
		res.redirect('/employees')
	} else {
		req.flash('errorMsg', `Something went wrong and ${employee.name} wasn't deleted`)
		res.redirect('/employees')
	}
})

// Test for routeCalculator with mongo data
router.get('/emp_id=:empId/route', ensureAuthenticated, async function(req, res) {
	let empId = req.params.empId
	let employee = await employeeFacade.findOneEmployeeById(empId)
	let stores = await storeFacade.findStoresByEmployeeId(empId)

	let empAddress = employee.address
	let storeAddresses = []
	stores.map(store => {
		storeAddresses.push(store.storeInfo.address)
	})
	console.log('empAddress:', empAddress)
	console.log('storeAddresses', storeAddresses)
	let route = await googleApiFacade.routeCalculator(empAddress, storeAddresses)

	res.render('test', { route })
})

module.exports = router
