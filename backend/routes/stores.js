const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')

// Store Facade
const storeFacade = require('../facades/storeFacade')

router.get('/', ensureAuthenticated, (req, res) => res.render('stores'))

router.get('/stores', ensureAuthenticated, async function(req, res) {
	let stores = await storeFacade.getAllStores()
	res.render('test', {
		stores
	})
})

module.exports = router
