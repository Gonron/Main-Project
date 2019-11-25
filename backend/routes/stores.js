const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')

// Store Facade
const employeeFacade = require('../facades/employeeFacade')
const storeFacade = require('../facades/storeFacade')
const googleApiFacade = require('../facades/googeApiFacade')

router.get('/', ensureAuthenticated, async function(req, res) {
	let stores = await storeFacade.getAllStores()
	res.render('stores', { stores })
})
router.get('/storenum=:storeNum', ensureAuthenticated, async function(req, res) {
	let storeNum = req.params.storeNum
	let store = await storeFacade.findOneStoreByNumber(storeNum)
	res.render('store', { store })
})

router.get('/route/emp_id=:empId', ensureAuthenticated, async function(req, res) {
	let empId = req.params.empId
	let employee = await employeeFacade.findOneEmployeeById(empId)
	let stores = await storeFacade.findStoresByEmployeeId(empId)

	let empAddress = employee.address
	let storeAddresses = []
	stores.map(store => {
		storeAddresses.push(store.storeInfo.address)
	})

	let route = await googleApiFacade.routeCalculator(empAddress, storeAddresses)

	res.render('test', { route })
})

router.get('/test', ensureAuthenticated, async function(req, res) {
	let route = await googleApiFacade.routeCalculator('Enghavevej 130, 2450 København SV', [
		'Blåkildevej 2-4 2630 Taastrup',
		'Ugandavej 111 2770 Kastrup',
		'Vasevej 119 A 3460 Birkerød',
		'Bymidten 23 3500 Værløse'
	])
	console.log(route.routeInformation)
})

module.exports = router
