const mongoose = require('mongoose')
const expect = require('chai').expect

// Facade
const employeeFacade = require('../facades/employeeFacade')

// Model
const { Employee } = require('../models/Employee')

describe('Test - Employee Facade', function() {
	before(async function() {
		// DB Config
		const db = require('../config/keys').MongoURITest

		// Connect to Mongo
		await mongoose
			.connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
			.then(() => console.log('MongoDB Connected - testEmployee...'))
			.catch(err => console.log('Error:', err))
	})

	after(async function() {
		await mongoose.disconnect()
	})

	beforeEach(async function() {
		await Employee.deleteMany({})
		employees = await Employee.insertMany([
			{
				name: 'Beline Camilla Kjærgaard Pedersen',
				title: 'Service Konsulent',
				email: 'bckp@cloetta.dk',
				address: 'somestreet 230'
			},
			{
				name: 'Uffe Erik Hansen',
				title: 'Service Konsulent',
				email: 'ueh@cloetta.dk',
				address: 'somestreet 232'
			},
			{
				name: 'Klaus Petersen',
				title: 'Salgs Konsulent',
				email: 'kp@cloetta.dk',
				address: 'somestreet 233'
			}
		])
	})

	it('Find All Employees', async function() {
		let employees = await employeeFacade.getAllEmployees()
		expect(employees.length).to.be.equal(3)
	})

	it('Find Uffe By Name', async function() {
		let employee = await employeeFacade.findEmployeeByName('Uffe Erik Hansen')
		expect(employee.name).to.be.equal('Uffe Erik Hansen')
	})

	it('Find Klaus By Email', async function() {
		let employee = await employeeFacade.findEmployeeByEmail('kp@cloetta.dk')
		expect(employee.name).to.be.equal('Klaus Petersen')
	})

	it('Find Beline By ID', async function() {
		let employee = await employeeFacade.findEmployeeById(employees[0]._id)
		expect(employee.email).to.be.equal('bckp@cloetta.dk')
	})
})
