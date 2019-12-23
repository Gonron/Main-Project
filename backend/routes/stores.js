const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')
const moment = require('moment')

// Store Facade
const employeeFacade = require('../facades/employeeFacade')
const storeFacade = require('../facades/storeFacade')

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
router.get('/storenum=:storeNum/update', ensureAuthenticated, async function(req, res) {
	let store = await storeFacade.findOneStoreByNumber(req.params.storeNum)
	let employees = await employeeFacade.getAllEmployees()
	res.render('updateStore', { store, employees })
})
// Update Store Handle
router.post('/storenum=:storeNum/update', ensureAuthenticated, async function(req, res) {
	// Getting information about the employees attached to the store
	let serviceConsultant = await employeeFacade.findOneEmployeeByName(req.body.serviceConsultant)
	let salesConsultant = await employeeFacade.findOneEmployeeByName(req.body.salesConsultant)

	// Getting information about the specified store and all employees
	let store = await storeFacade.findOneStoreByNumber(req.params.storeNum)
	let employees = await employeeFacade.getAllEmployees()

	// REDO THIS - finds the frequency depending on the priority
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

	// Calculates timeSpentTotal and formats it using moment
	let timeSpentPM = req.body.timeSpentPM
	let timeSpentPacked = req.body.timeSpentPacked
	let timeSpentSeconds =
		moment.duration(timeSpentPM).asSeconds() + moment.duration(timeSpentPacked).asSeconds()
	let timeSpentTotal = moment
		.utc(moment.duration(timeSpentSeconds, 'seconds').asMilliseconds())
		.format('HH:mm')

	// Validates the store
	let errors = await storeFacade.storeValidation(req.body, store._id)

	if (errors.length > 0) {
		// Fails alidation and re-renders the update page
		res.render('updateStore', {
			errors,
			store,
			employees
		})
	} else {
		// Passes validation and begins to update the store.
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
		// After update, it redirects you back to that stores page and sends a succesMsg.
		req.flash('successMsg', `${req.body.storeName} - ${req.body.storeNum} has been updated`)
		res.redirect('/stores')
	}
})

// Add Store Page
router.get('/addStore', ensureAuthenticated, async function(req, res) {
	let employees = await employeeFacade.getAllEmployees()
	res.render('addStore', { employees, req })
})

// Add Store Handle
router.post('/addStore', ensureAuthenticated, async function(req, res) {
	// Getting information about the employees attached to the store
	let serviceConsultant = await employeeFacade.findOneEmployeeByName(req.body.serviceConsultant)
	let salesConsultant = await employeeFacade.findOneEmployeeByName(req.body.salesConsultant)

	// Getting information about the specified store and all employees
	let employees = await employeeFacade.getAllEmployees()

	// REDO THIS - finds the frequency depending on the priority
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

	// Calculates timeSpentTotal and formats it using moment
	let timeSpentPM = req.body.timeSpentPM
	let timeSpentPacked = req.body.timeSpentPacked
	let timeSpentSeconds =
		moment.duration(timeSpentPM).asSeconds() + moment.duration(timeSpentPacked).asSeconds()
	let timeSpentTotal = moment
		.utc(moment.duration(timeSpentSeconds, 'seconds').asMilliseconds())
		.format('HH:mm')

	// Validates the store
	let errors = await storeFacade.storeValidation(req.body)

	if (errors.length > 0) {
		// Fails alidation and re-renders the update page
		res.render('addStore', {
			errors,
			req,
			employees
		})
	} else {
		// Passes validation and begins to update the store.
		await storeFacade.addStore(
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
		// After update, it redirects you back to that stores page and sends a succesMsg.
		req.flash('successMsg', `${req.body.storeName} - ${req.body.storeNum} has been added`)
		res.redirect(`/stores`)
	}
})

// Delete Store Handle
router.get('/storenum=:storeNum/delete', ensureAuthenticated, async function(req, res) {
	let storeNum = req.params.storeNum
	let store = await storeFacade.findOneStoreByNumber(storeNum)
	await storeFacade.deleteStoreById(store._id)

	let delStore = await storeFacade.findOneStoreById(store._id)
	if (!delStore) {
		req.flash(
			'successMsg',
			`${store.storeInfo.storeName} - ${store.storeInfo.storeNum} has been deleted`
		)
		res.redirect('/stores')
	} else {
		req.flash(
			'errorMsg',
			`Something went wrong and ${store.storeInfo.storeName} - ${store.storeInfo.storeNum} wasn't deleted`
		)
		res.redirect('/stores')
	}
})

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
