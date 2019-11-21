const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')

// Store Facade
const storeFacade = require('../facades/storeFacade')
const googleApiFacade = require('../facades/googeApiFacade')

router.get('/', ensureAuthenticated, async function(req, res) {
	let stores = await storeFacade.getAllStores()
	res.render('stores', { stores })
})
router.get('/storenum=:storeNum', ensureAuthenticated, async function(req, res) {
	let storeNum = req.params.storeNum
	let store = await storeFacade.findStoreByNumber(storeNum)
	res.render('store', { store })
})

router.get('/test', ensureAuthenticated, async function(req, res) {
	let test = await googleApiFacade.googleApi('Sydhavn St', ['Ørestad St', 'Haslev St'])
	console.log(test)
	res.render('test', { test })
})

module.exports = router
