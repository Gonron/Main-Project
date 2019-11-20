const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')

// Store Facade
const storeFacade = require('../facades/storeFacade')

router.get('/', ensureAuthenticated, async function(req, res) {
	let stores = await storeFacade.getAllStores()
	res.render('stores', { stores })
})
router.get('/storenum=:storeNum', ensureAuthenticated, async function(req, res) {
	let storeNum = req.params.storeNum
	let store = await storeFacade.findStoreByNumber(storeNum)
	res.render('store', { store })
})

module.exports = router
