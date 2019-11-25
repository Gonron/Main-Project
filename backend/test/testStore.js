const mongoose = require('mongoose')
const expect = require('chai').expect

// Facade
const storeFacade = require('../facades/storeFacade')
const employeeFacade = require('../facades/employeeFacade')

// Model
const Store = require('../models/Store')
const { Employee } = require('../models/Employee')

describe('Test - Store Facade', function() {
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
			.then(() => console.log('MongoDB Connected - testStore...'))
			.catch(err => console.log('Error:', err))
	})

	after(async function() {
		await mongoose.disconnect()
	})

	// Setup the database in a known state BEFORE EACH test
	beforeEach(async function() {
		await Store.deleteMany({})
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
				name: 'Michael Lundsgaard',
				title: 'Salgs Konsulent',
				email: 'ml@cloetta.dk',
				address: 'somestreet 234'
			}
		])
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
					serviceConsultant: employees[0],
					salesConsultant: employees[2],
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
					serviceConsultant: employees[1],
					salesConsultant: employees[2],
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
			},
			{
				storeInfo: {
					storeNum: 5211537,
					storeName: 'Meny Carlsbergbyen',
					storeChain: 'Meny',
					address: 'Tapperitorvet 44-46',
					zipCode: 1799,
					city: 'København',
					phone: '33876000'
				},
				empInfo: {
					serviceConsultant: employees[0],
					salesConsultant: employees[3],
					visitDay: 'Man/Tors',
					priority: 'A',
					frequency: '2 besøg hver uge'
				},
				containers: {
					CKS2Full: 4,
					CKSSmartLow: 2,
					Parrot: 2
				},
				timeSpent: {
					timeSpentPM: '01:35',
					timeSpentPacked: '00:50',
					timeSpentTotal: '02:25'
				},
				avgAmount: 145
			}
		])
	})

	it('Find All Stores', async function() {
		let stores = await storeFacade.getAllStores()
		expect(stores.length).to.be.equal(3)
	})

	it('Find Bilka Hundige By Store Name', async function() {
		let store = await storeFacade.findOneStoreByName('Bilka Hundige')
		expect(store.storeInfo.storeName).to.be.equal('Bilka Hundige')
	})

	it('Find All Meny By Store Name', async function() {
		let stores = await storeFacade.findStoresByName('meny')
		expect(stores.length).to.be.equal(2)
	})

	it('Find Bilka Hundige By Store Number', async function() {
		let store = await storeFacade.findOneStoreByNumber(5670017)
		expect(store.storeInfo.storeNum).to.be.equal(5670017)
	})

	it('Find Bilka Hundige By ID', async function() {
		let store = await storeFacade.findOneStoreById(stores[0]._id)
		expect(store.storeInfo.storeNum).to.be.equal(5670017)
	})

	it('Find Bilka/Meny by Employee ID', async function() {
		let stores = await storeFacade.findStoresByEmployeeId(employees[2]._id)
		expect(stores.length).to.be.equal(2)
		expect(stores[0].storeInfo.storeName).to.be.equal('Bilka Hundige')
		expect(stores[1].storeInfo.storeName).to.be.equal('Meny Hvidover')
	})

	it('Find Meny by Employee ID', async function() {
		let stores = await storeFacade.findStoresByEmployeeId(employees[1]._id)
		expect(stores.length).to.be.equal(1)
		expect(stores[0].storeInfo.storeName).to.be.equal('Meny Hvidover')
	})

	it('Find Klaus Stores With Visit Days on Fredays', async function() {
		let stores = await storeFacade.findStoresByEmployeedAndEmpVisitDay(employees[2]._id, 'fre')
		expect(stores.length).to.be.equal(1)
		expect(stores[0].empInfo.visitDay).to.be.equal('Man/Fre')
	})

	it('Add Føtex Carlsbergbyen', async function() {
		let empSerive = await employeeFacade.addEmployee(
			'Michael Lundsgaard',
			'Service Konsulent',
			'ml@cloetta.dk',
			'somestreet 234'
		)
		let empSales = await employeeFacade.addEmployee(
			'Klaus Petersen',
			'Salgs Konsulent',
			'kp@cloetta.dk',
			'somestreet 235'
		)
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
				serviceConsultant: empSerive,
				salesConsultant: empSales,
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
		expect(stores.length).to.be.equal(4)
	})

	it('Update Bilka Hundige By ID', async function() {
		await storeFacade.updateStoreById(
			stores[0]._id,
			{
				storeNum: 5670017,
				storeName: 'Bilka Hundige',
				storeChain: 'Bilka/A-Z',
				address: 'Hundige Centervej 450',
				zipCode: 2670,
				city: 'Greve',
				phone: '43955000'
			},
			{
				serviceConsultant: employees[0],
				salesConsultant: employees[2],
				visitDay: 'Man/Fre',
				priority: 'A',
				frequency: '2 besøg hver uge'
			},
			{
				CKS1Full: 10,
				Parrot: 2
			},
			{
				timeSpentPM: '03:04',
				timeSpentPacked: '02:02',
				timeSpentTotal: '05:06'
			},
			207
		)
		let store = await storeFacade.findOneStoreById(stores[0]._id)
		expect(store.avgAmount).to.be.equal(207)
		expect(store.containers.Parrot).to.be.equal(2)
	})

	it('Delete Meny Hvidover By ID', async function() {
		await storeFacade.deleteStoreById(stores[1]._id)
		let store = await storeFacade.findOneStoreById(stores[1]._id)
		let store_ = await storeFacade.getAllStores()
		expect(store).to.be.null
		expect(store_.length).to.be.equal(2)
	})

	it('Delete Meny Hvidover By Number', async function() {
		await storeFacade.deleteStoreByNumber(5173029)
		let store = await storeFacade.findOneStoreById(stores[1]._id)
		let store_ = await storeFacade.getAllStores()
		expect(store).to.be.null
		expect(store_.length).to.be.equal(2)
	})
})
