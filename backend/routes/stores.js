const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')
const moment = require('moment')

// Store Facade
const employeeFacade = require('../facades/employeeFacade')
const storeFacade = require('../facades/storeFacade')
const googleApiFacade = require('../facades/googeApiFacade')

// Stores Page
router.get('/', ensureAuthenticated, async function(req, res) {
	let stores = await storeFacade.getAllStores()
	res.render('stores', { stores })
})

// Specific Store Page
router.get('/storenum=:storeNum', ensureAuthenticated, async function(req, res) {
	let storeNum = req.params.storeNum
	let store = await storeFacade.findOneStoreByNumber(storeNum)
	res.render('store', { store })
})

// Update Store Page
router.get('/storenum=:storeNum/update', async function(req, res) {
	let store = await storeFacade.findOneStoreByNumber(req.params.storeNum)
	let employees = await employeeFacade.getAllEmployees()
	res.render('updateStore', { store, employees })
})
// Update Store Handle
router.post('/storenum=:storeNum/update', async function(req, res) {
	console.log(req.body)
	let serviceConsultant = await employeeFacade.findOneEmployeeByName(req.body.serviceConsultant)
	let salesConsultant = await employeeFacade.findOneEmployeeByName(req.body.salesConsultant)
	let store = await storeFacade.findOneStoreByNumber(req.params.storeNum)
	let employees = await employeeFacade.getAllEmployees()
	let frequency = ''

	switch (req.body.priority) {
		case 'A':
			frequency = '2 besøg hver uge'
			break
		case 'B':
			frequency = '1 besøg hver uge'
			break
		case 'C':
			frequency = '1 besøg hver anden uge'
			break
		case 'D':
			frequency = '1 besøg hver måned'
			break
	}

	let timeSpentPM = req.body.timeSpentPM
	let timeSpentPacked = req.body.timeSpentPacked

	let timeSpentSeconds =
		moment.duration(timeSpentPM).asSeconds() + moment.duration(timeSpentPacked).asSeconds()

	let timeSpentTotal = moment
		.utc(moment.duration(timeSpentSeconds, 'seconds').asMilliseconds())
		.format('HH:mm')

	let errors = storeFacade.storeValidation(req.body)

	if (errors.length > 0) {
		res.render('updateStore', {
			errors,
			store,
			employees
		})
	} else {
		await storeFacade.updateStoreById(
			store._id,
			{
				storeNum: req.body.storeNum,
				storeName: req.body.storeName,
				storeChain: req.body.storeChain,
				address: req.body.address,
				zipCode: req.body.zipCode,
				city: req.body.city,
				phone: req.body.phone
			},
			{
				serviceConsultant: serviceConsultant,
				salesConsultant: salesConsultant,
				visitDay: req.body.visitDay,
				priority: req.body.priority,
				frequency: frequency
			},
			{
				CKS2Full: req.body.CKS2Full,
				CKS2Split: req.body.CKS2Split,
				CKS1High: req.body.CKS1High,
				CKS1Full: req.body.CKS1Full,
				CKS1Low: req.body.CKS1Low,
				CKSSmartLow: req.body.CKSSmartLow,
				Parrot: req.body.Parrot
			},
			{
				timeSpentPM: req.body.timeSpentPM,
				timeSpentPacked: req.body.timeSpentPacked,
				timeSpentTotal: timeSpentTotal
			},
			req.body.avgAmount
		)
		req.flash('successMsg', `${req.body.storeName} - ${req.body.storeNum} has been updated`)
		res.redirect(`/stores/storenum=${req.params.storeNum}`)
	}
})
// Test for routeCalculator with mongo data
// router.get('/route/emp_id=:empId', ensureAuthenticated, async function(req, res) {
// 	let empId = req.params.empId
// 	let employee = await employeeFacade.findOneEmployeeById(empId)
// 	let stores = await storeFacade.findStoresByEmployeeId(empId)

// 	let empAddress = employee.address
// 	let storeAddresses = []
// 	stores.map(store => {
// 		storeAddresses.push(store.storeInfo.address)
// 	})

// 	let route = await googleApiFacade.routeCalculator(empAddress, storeAddresses)

// 	res.render('test', { route })
// })

// Test for routeCalculator with hardcoded data
// router.get('/test', ensureAuthenticated, async function(req, res) {
// 	let route = await googleApiFacade.routeCalculator('Enghavevej 130, 2450 København SV', [
// 		'Blåkildevej 2-4 2630 Taastrup',
// 		'Ugandavej 111 2770 Kastrup',
// 		'Vasevej 119 A 3460 Birkerød',
// 		'Bymidten 23 3500 Værløse'
// 	])
// 	console.log(route.routeInformation)
// })

module.exports = router
