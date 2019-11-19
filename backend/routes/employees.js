const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')

// Employee Facade
const employeeFacade = require('../facades/employeeFacade')

router.get('/', ensureAuthenticated, async function(req, res) {
	let employees = await employeeFacade.getAllEmployees()
	res.render('employees', { employees })
})

module.exports = router
