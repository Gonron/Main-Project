const mongoose = require('mongoose')

// DB Config
const db = require('./config/keys').MongoURI

// Connect to Mongo
mongoose
	.connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected - makeData...'))
	.catch(err => console.log('Error:', err))

const User = require('./models/User')
const Store = require('./models/Store')

async function makeData() {
	console.log('Adding Stores')
	try {
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
	} catch (err) {
		console.log(err)
	}
}

makeData()
