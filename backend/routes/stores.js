const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')

// Store Facade
const storeFacade = require('../facades/storeFacade')

router.get('/', ensureAuthenticated, async function(req, res) {
	let stores = await storeFacade.getAllStores()
	res.render('stores', { stores })
})

module.exports = router
