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

		// Sets a Timeout
		this.timeout(5000)

		// Connect to Mongo
		await mongoose
			.connect(db, {
				useUnifiedTopology: true,
				useNewUrlParser: true,
				useFindAndModify: false
			})
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
			},
			{
				name: 'Kurt Wonnegut',
				title: 'Salgs Konsulent',
				email: 'kw@cloetta.dk',
				address: 'somestreet 234'
			},
			{
				name: 'Keth Wonnegut',
				title: 'Service Konsulent',
				email: 'kwo@cloetta.dk',
				address: 'somestreet 235'
			}
		])
	})

	it('Find All Employees', async function() {
		let employees = await employeeFacade.getAllEmployees()
		expect(employees.length).to.be.equal(5)
	})

	it('Find Uffe By Name', async function() {
		let employee = await employeeFacade.findOneEmployeeByName('Uffe Erik Hansen')
		expect(employee.name).to.be.equal('Uffe Erik Hansen')
	})

	it('Find All Wonneguts By Name', async function() {
		let employees = await employeeFacade.findEmployeesByName('wonnegut')
		expect(employees.length).to.be.equal(2)
	})

	it('Find Klaus By Email', async function() {
		let employee = await employeeFacade.findOneEmployeeByEmail('kp@cloetta.dk')
		expect(employee.name).to.be.equal('Klaus Petersen')
	})

	it('Find All Wonneguts By Email', async function() {
		let employees = await employeeFacade.findEmployeesByEmail('kw')
		expect(employees.length).to.be.equal(2)
	})

	it('Find Beline By ID', async function() {
		let employee = await employeeFacade.findOneEmployeeById(employees[0]._id)
		expect(employee.email).to.be.equal('bckp@cloetta.dk')
	})

	it('Add Michael Lundsgaard', async function() {
		let employee = await employeeFacade.addEmployee(
			'Michael Lundsgaard',
			'Service Konsulent',
			'ml@cloetta.dk',
			'somestreet 260'
		)
		expect(employee).to.not.be.null
		expect(employee.name).to.be.equal('Michael Lundsgaard')
		let employees = await employeeFacade.getAllEmployees()
		expect(employees.length).to.be.equal(6)
	})

	it('Update Kurt', async function() {
		await employeeFacade.updateEmployeeById(
			employees[3]._id,
			'Kurt Wonnegut',
			'Service Konsulent',
			'kw@cloetta.dk',
			'updatedAddress 123'
		)
		let employee = await employeeFacade.findOneEmployeeById(employees[3]._id)
		expect(employee.address).to.be.equal('updatedAddress 123')
	})

	it('Delete Klaus By ID', async function() {
		await employeeFacade.deleteEmployeeById(employees[2]._id)
		let employee = await employeeFacade.findOneEmployeeById(employees[2]._id)
		let employee_ = await employeeFacade.getAllEmployees()
		expect(employee).to.be.null
		expect(employee_.length).to.be.equal(4)
	})

	it('Fail Validation For Update - No Fields', async function() {
		let employee = await employeeFacade.findOneEmployeeByName('Keth Wonnegut')
		let errors = await employeeFacade.employeeValidation('', '', '', '', employee._id)
		expect(errors.length).to.be.equal(1)
		expect(errors[0].msg).to.be.equal('Please fill in all fields')
	})

	it('Pass Validation For Update', async function() {
		let employee = await employeeFacade.findOneEmployeeByName('Keth Wonnegut')
		let errors = await employeeFacade.employeeValidation(
			'Keth Wonnegut',
			'Service Konsulent',
			'kwo@cloetta.dk',
			'somestreet 235',
			employee._id
		)
		expect(errors.length).to.be.equal(0)
	})
})
