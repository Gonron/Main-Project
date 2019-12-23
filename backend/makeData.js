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
				name: 'Michael Ejdal Lundsgaard',
				title: 'Service Konsulent',
				email: 'mel@cloetta.dk',
				address: 'Enghavevej 130, 2450 København'
			},
			{
				name: 'Kira Smith',
				title: 'Salgs Konsulent',
				email: 'ks@cloetta.dk',
				address: 'Borgbjergsvej 28, 2450 København'
			},
			{
				name: 'Klaus Petersen',
				title: 'Team Leader',
				email: 'kp@cloetta.dk',
				address: 'Storgaardsvej 23, 4690 Haslev'
			},
			{
				name: 'Kurt Wonnegut',
				title: 'Salgs Konsulent',
				email: 'kw@cloetta.dk',
				address: 'Knøsen 23, 2670 Greve'
			},
			{
				name: 'Sebastian S. Olsen',
				title: 'Service Konsulent',
				email: 'sso@cloetta.dk',
				address: 'Algade 16, 5683 Haarby'
			},
			{
				name: 'Trine Laursen',
				title: 'Service Konsulent',
				email: 'tl@cloetta.dk',
				address: 'Hersnapvej 3, 1072 København K'
			},
			{
				name: 'Christoffer Andresen',
				title: 'Salgs Konsulent',
				email: 'ca@cloetta.dk',
				address: 'Bygmestervej 42, 1583 København V'
			},
			{
				name: 'Maria D. Møller',
				title: 'Service Konsulent',
				email: 'mdm@cloetta.dk',
				address: 'Grønlandsgade 2, 1778 København V'
			}
		])
		stores = await Store.insertMany([
			{
				storeInfo: {
					storeNum: 5670017,
					storeName: 'Bilka Hundige',
					storeChain: 'Bilka',
					address: 'Hundige Centervej 450, 2670 Greve',
					zipCode: 2670,
					city: 'Greve',
					phone: '43955000'
				},
				empInfo: {
					serviceConsultant: employees[7],
					salesConsultant: employees[6],
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
					storeName: 'Meny Allerød',
					storeChain: 'Meny',
					address: 'Kirsebærgården 2, 3450 Lillerød',
					zipCode: 3450,
					city: 'Lillerød',
					phone: '48141778'
				},
				empInfo: {
					serviceConsultant: employees[4],
					salesConsultant: employees[3],
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
					storeNum: 5113225,
					storeName: 'Føtex Carlsbergbyen',
					storeChain: 'Føtex',
					address: 'Tapperitorvet 44-46, 1799 København',
					zipCode: 1799,
					city: 'København',
					phone: '33876000'
				},
				empInfo: {
					serviceConsultant: employees[0],
					salesConsultant: employees[1],
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
			},
			{
				storeInfo: {
					storeNum: 1002542,
					storeName: 'Netto Sydhavnen',
					storeChain: 'Netto',
					address: 'Tranehavevej 1, 2450 København',
					zipCode: 2450,
					city: 'København',
					phone: '87787811'
				},
				empInfo: {
					serviceConsultant: employees[0],
					salesConsultant: employees[1],
					visitDay: 'Tors',
					priority: 'C',
					frequency: '1 besøg hver anden uge'
				},
				containers: {
					CKS1Low: 4
				},
				timeSpent: {
					timeSpentPM: '00:25',
					timeSpentPacked: '00:20',
					timeSpentTotal: '00:45'
				},
				avgAmount: 42
			},
			{
				storeInfo: {
					storeNum: 2012572,
					storeName: 'Netto Carlsbergbyen',
					storeChain: 'Netto',
					address: 'Tapperitorvet 2, 1799 København',
					zipCode: 1799,
					city: 'København',
					phone: '87787811'
				},
				empInfo: {
					serviceConsultant: employees[0],
					salesConsultant: employees[1],
					visitDay: 'Man',
					priority: 'B',
					frequency: '1 besøg hver uge'
				},
				containers: {
					CKS1Full: 6
				},
				timeSpent: {
					timeSpentPM: '01:25',
					timeSpentPacked: '00:45',
					timeSpentTotal: '02:10'
				},
				avgAmount: 101
			},
			{
				storeInfo: {
					storeNum: 1031872,
					storeName: 'Fakta Borgbjergsvej',
					storeChain: 'Fakta',
					address: 'Borgbjergsvej 28, 2450 København',
					zipCode: 2450,
					city: 'København',
					phone: '43864386'
				},
				empInfo: {
					serviceConsultant: employees[0],
					salesConsultant: employees[1],
					visitDay: 'Man',
					priority: 'B',
					frequency: '1 besøg hver uge'
				},
				containers: {
					CKS1Full: 4,
					Parrot: 2
				},
				timeSpent: {
					timeSpentPM: '01:40',
					timeSpentPacked: '01:15',
					timeSpentTotal: '02:55'
				},
				avgAmount: 124
			}
		])

		// Disconnect from Mongo
		await mongoose.disconnect()
	} catch (err) {
		console.log(err)
	}
}

makeData()

// Disconnect from Mongo
