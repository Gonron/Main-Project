const express = require('express')
const router = express.Router()

// Facades
const registerFacade = require('../facades/registerFacade')
const authFacade = require('../facades/authFacade')

// User model
const User = require('../models/User')

// Login Page
router.get('/login', (req, res) => res.render('login'))

// Register Page
router.get('/register', (req, res) => res.render('register'))

// Register Handle
router.post('/register', (req, res) => {
	const { name, email, password, password2 } = req.body

	registerFacade.register(name, email, password, password2, req, res)
})

// Login Handle
router.post('/login', (req, res, next) => {
	authFacade.login(req, res, next)
})

// Logout Handle
router.get('/logout', (req, res) => {
	authFacade.logout(req, res)
})

module.exports = router
