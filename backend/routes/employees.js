const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')

// Facades
const employeeFacade = require('../facades/employeeFacade')
const storeFacade = require('../facades/storeFacade')

router.get('/', ensureAuthenticated, async function(req, res) {
	let employees = await employeeFacade.getAllEmployees()
	res.render('employees', { employees })
})

router.get('/emp_id=:empId', ensureAuthenticated, async function(req, res) {
	let empId = req.params.empId
	let stores = await storeFacade.findStoreByEmployeeId(empId)
	let employee = await employeeFacade.findEmployeeById(empId)
	res.render('employee', { stores, employee })
})

module.exports = router
