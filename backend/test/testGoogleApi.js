const mongoose = require('mongoose')
const expect = require('chai').expect

// Facade
const googleApiFacade = require('../facades/googeApiFacade')

// Model
const { Employee } = require('../models/Employee')

describe('Test - GoogleApi Facade', function() {
	before(async function() {
		// DB Config
		const db = require('../config/keys').MongoURITest

		// Sets a Timeout
		this.timeout(5000)

		// Connect to Mongo
		await mongoose
			.connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
			.then(() => console.log('MongoDB Connected - testGoogleApi...'))
			.catch(err => console.log('Error:', err))
	})

	after(async function() {
		await mongoose.disconnect()
	})

	beforeEach(async function() {
		await Employee.deleteMany({})
		employees = await Employee.insertMany([
			{
				name: 'Kurt Wonnegut',
				title: 'Service Konsulent',
				email: 'kwp@cloetta.dk',
				address: 'Enghavevej 130, 2450 København'
			},
			{
				name: 'Hanne Wonnegut',
				title: 'Service Konsulent',
				email: 'hk@cloetta.dk',
				address: 'Storgaardsvej 23, 4690 Haslev'
			},
			{
				name: 'Keth Wonnegut',
				title: 'Salgs Konsulent',
				email: 'khw@cloetta.dk',
				address: 'Købmagergade 52A, 1150 København'
			}
		])
	})

	it('Find Distance/Duration Between Kurt And Hanne (Driving)', async function() {
		let response = await googleApiFacade.googleApi(employees[0].address, employees[1].address)
		expect(response).to.not.be.null
		expect(response.durations.value.length).to.be.equal(1)
	})

	it('Find Distance/Duration Between Kurt And Hanne (Transit)', async function() {
		let response = await googleApiFacade.googleApi(
			employees[0].address,
			employees[1].address,
			'transit'
		)
		expect(response).to.not.be.null
		expect(response.durations.value.length).to.be.equal(1)
	})

	it('Find Distance/Duration Between Kurt To Hanne, Keth (Driving)', async function() {
		let response = await googleApiFacade.googleApi(employees[0].address, [
			employees[1].address,
			employees[2].address
		])
		expect(response).to.not.be.null
		expect(response.durations.value.length).to.be.equal(2)
	})

	it('Calculate The Shortest Route In Duration', async function() {
		let route = await googleApiFacade.routeCalculator('Enghavevej 130, 2450 København SV', [
			'Blåkildevej 2-4 2630 Taastrup',
			'Ugandavej 111 2770 Kastrup',
			'Vasevej 119 A 3460 Birkerød',
			'Bymidten 23 3500 Værløse'
		])
		console.log(route)
		expect(route.routeInformation.destinationAddress[0]).to.be.equal(
			'Ugandavej 111, 2770 Kastrup, Danmark'
		)
		expect(route.routeInformation.destinationAddress[1]).to.be.equal(
			'Blåkildevej 2, 4, 2630 Taastrup, Danmark'
		)
		expect(route.routeInformation.destinationAddress[2]).to.be.equal(
			'Bymidten 23, 3500 Værløse, Danmark'
		)
		expect(route.routeInformation.destinationAddress[3]).to.be.equal(
			'Vasevej 119A, 3460 Birkerød, Danmark'
		)
	})
})
