const mongoose = require('mongoose')

// DB Config
const db = require('./config/keys').MongoURI

// Connect to Mongo
mongoose
	.connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected - makeData...'))
	.catch(err => console.log('Error:', err))

const { Employee } = require('./models/Employee')
const Store = require('./models/Store')

async function makeData() {
	console.log('Adding Stores')
	try {
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
				name: 'Kurt Wonnegut',
				title: 'Service Konsulent',
				email: 'kw@cloetta.dk',
				address: 'somestreet 234'
			},
			{
				name: 'Hanne Wonnegut',
				title: 'Salgs Konsulent',
				email: 'hk@cloetta.dk',
				address: 'somestreet 235'
			},
			{
				name: 'Michael Lundsgaard',
				title: 'Service Konsulent',
				email: 'ml@cloetta.dk',
				address: 'somestreet 236'
			},
			{
				name: 'Henrik Lundsgaard',
				title: 'Service Konsulent',
				email: 'hl@cloetta.dk',
				address: 'somestreet 237'
			},
			{
				name: 'Kira Smith',
				title: 'Salgs Konsulent',
				email: 'ks@cloetta.dk',
				address: 'somestreet 238'
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
			}
		])

		// Disconnect from Mongo
		await mongoose
			.disconnect()
			.then(() => console.log('MongoDB Disconnected - makeDate'))
			.catch(err => console.log('Error:', err))
	} catch (err) {
		console.log(err)
	}
}

makeData()

// Disconnect from Mongo
