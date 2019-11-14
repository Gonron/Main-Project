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
		let storeInfos = [
			{
				storeNum: 5670017,
				storeName: 'Bilka',
				storeChain: 'Bilka/A-Z',
				address: 'Hundige Centervej 450',
				zipCode: 2670,
				city: 'Greve',
				phone: '43955000',
				serviceConsultant: 'Beline Camilla Kjærgaard Pedersen',
				salesConsultant: 'Peter Johansen',
				visitDay: 'Man/Fre',
				priority: 'A',
				frequency: '2 besøg hver uge',
				CKS1Full: 10,
				timeSpentPM: '03:04',
				timeSpentPacked: '02:02',
				timeSpentTotal: '05:06',
				avgAmount: 182
			},
			{
				storeNum: 5173029,
				storeName: 'Meny Hvidover',
				storeChain: 'Meny',
				address: 'Hvidovre Stationscenter 57',
				zipCode: 2650,
				city: 'Hvidover',
				phone: '36762511',
				serviceConsultant: 'Uffe Erik Hansen',
				salesConsultant: 'Klaus Petersen',
				visitDay: 'Ons',
				priority: 'B',
				frequency: '1 besøg hver uge',
				CKS2Full: 6,
				timeSpentPM: '01:15',
				timeSpentPacked: '00:30',
				timeSpentTotal: '01:45',
				avgAmount: 72
			}
		]
		await Store.deleteMany({})

		var stores = await Store.insertMany(storeInfos)
		console.log(stores)
	} catch (err) {
		console.log(err)
	}
}

makeData()
