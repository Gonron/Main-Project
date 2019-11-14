const passport = require('passport')

let login = (req, res, next) => {
	passport.authenticate('local', {
		successRedirect: '/dashboard',
		failureRedirect: '/users/login',
		failureFlash: true
	})(req, res, next)
}

let logout = (req, res) => {
	req.logout
	req.flash('successMsg', 'You are logged out')
	res.redirect('/users/login')
}

module.exports = { login, logout }
