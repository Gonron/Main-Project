const mongoose = require('mongoose')
const expect = require('chai').expect

// Facade
const storeFacade = require('../facades/storeFacade')

// Model
const Store = require('../models/Store')

describe('Test - Store Facade', function() {
	before(async function() {
		// DB Config
		const db = require('../config/keys').MongoURITest

		// Connect to Mongo
		await mongoose
			.connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
			.then(() => console.log('MongoDB Connected - testStore...'))
			.catch(err => console.log('Error:', err))
	})

	after(async function() {
		await mongoose.disconnect()
	})

	// Setup the database in a known state BEFORE EACH test
	beforeEach(async function() {
		await Store.deleteMany({})
		stores = await Store.insertMany([
			{
				storeInfo: {
					storeNum: 5670017,
					storeName: 'Bilka Hundige',
					storeChain: 'Bilka/A-Z',
					address: 'Hundige Centervej 450',
					zipCode: 2670,
					city: 'Greve',
					phone: '43955000'
				},
				empInfo: {
					serviceConsultant: {
						name: 'Beline Camilla Kjærgaard Pedersen',
						title: 'Service Konsulent',
						email: 'bckp@cloetta.dk',
						address: 'somestreet 230'
					},
					salesConsultant: {
						name: 'Peter Johansen',
						title: 'Salgs Konsulent',
						email: 'pj@cloetta.dk',
						address: 'somestreet 231'
					},
					visitDay: 'Man/Fre',
					priority: 'A',
					frequency: '2 besøg hver uge'
				},
				containers: {
					CKS1Full: 10
				},
				timeSpent: {
					timeSpentPM: '03:04',
					timeSpentPacked: '02:02',
					timeSpentTotal: '05:06'
				},
				avgAmount: 182
			},
			{
				storeInfo: {
					storeNum: 5173029,
					storeName: 'Meny Hvidover',
					storeChain: 'Meny',
					address: 'Hvidovre Stationscenter 57',
					zipCode: 2650,
					city: 'Hvidover',
					phone: '36762511'
				},
				empInfo: {
					serviceConsultant: {
						name: 'Uffe Erik Hansen',
						title: 'Service Konsulent',
						email: 'ueh@cloetta.dk',
						address: 'somestreet 232'
					},
					salesConsultant: {
						name: 'Klaus Petersen',
						title: 'Salgs Konsulent',
						email: 'kp@cloetta.dk',
						address: 'somestreet 233'
					},
					visitDay: 'Ons',
					priority: 'B',
					frequency: '1 besøg hver uge'
				},
				containers: {
					CKS2Full: 6
				},
				timeSpent: {
					timeSpentPM: '01:15',
					timeSpentPacked: '00:30',
					timeSpentTotal: '01:45'
				},
				avgAmount: 72
			}
		])
	})

	it('Find All Stores', async function() {
		let stores = await storeFacade.getAllStores()
		expect(stores.length).to.be.equal(2)
	})

	it('Find Bilka/A-Z By Store Name', async function() {
		let store = await storeFacade.findStoreByName('Bilka Hundige')
		expect(store.storeInfo.storeName).to.be.equal('Bilka Hundige')
	})

	it('Find Bilka/A-Z By Store Number', async function() {
		let store = await storeFacade.findStoreByNumber(5670017)
		expect(store.storeInfo.storeNum).to.be.equal(5670017)
	})

	it('Find Bilka/A-Z By ID', async function() {
		let store = await storeFacade.findStoreById(stores[0]._id)
		expect(store.storeInfo.storeNum).to.be.equal(5670017)
	})

	it('Add Føtex Carlsbergbyen', async function() {
		let store = await storeFacade.addStore(
			{
				storeNum: 5113225,
				storeName: 'Føtex Carlsbergbyen',
				storeChain: 'Meny',
				address: 'Tapperitorvet 44-46',
				zipCode: 1799,
				city: 'København',
				phone: '33876000'
			},
			{
				serviceConsultant: {
					name: 'Michael Lundsgaard',
					title: 'Service Konsulent',
					email: 'ml@cloetta.dk',
					address: 'somestreet 234'
				},
				salesConsultant: {
					name: 'Klaus Petersen',
					title: 'Salgs Konsulent',
					email: 'kp@cloetta.dk',
					address: 'somestreet 235'
				},
				visitDay: 'Man/Tors',
				priority: 'A',
				frequency: '2 besøg hver uge'
			},
			{
				CKS2Full: 4,
				CKSSmartLow: 2,
				Parrot: 2
			},
			{
				timeSpentPM: '01:35',
				timeSpentPacked: '00:50',
				timeSpentTotal: '02:25'
			},
			145
		)
		expect(store).to.not.be.null
		expect(store.storeInfo.storeName).to.be.equal('Føtex Carlsbergbyen')
		let stores = await storeFacade.getAllStores()
		expect(stores.length).to.be.equal(3)
	})
})
