const bcrypt = require('bcryptjs')

// User model
const User = require('../models/User')

let register = (name, email, password, password2, req, res) => {
	let errors = []

	// Check required fields
	if (!name || !email || !password || !password2) {
		errors.push({ msg: 'Please fill in all fields' })
	}

	// Check passwords match
	if (password != password2) {
		errors.push({ msg: 'Passwords do not match' })
	}

	// Check password length
	if (password.length < 6) {
		errors.push({
			msg: 'Password should be at least 6 characters'
		})
	}

	if (errors.length > 0) {
		res.render('register', {
			errors,
			name,
			email,
			password,
			password2
		})
	} else {
		// Validation passed
		User.findOne({ email: email }).then(user => {
			if (user) {
				// User exist
				errors.push({ msg: 'Email is already registered' })
				res.render('register', {
					errors,
					name,
					email,
					password,
					password2
				})
			} else {
				const newUser = new User({
					name,
					email,
					password
				})

				// Hash password
				bcrypt.genSalt(10, (err, salt) =>
					bcrypt.hash(
						newUser.password,
						salt,
						(err, hash) => {
							if (err) throw err
							// Set password to hashed
							newUser.password = hash
							// Save user
							newUser
								.save()
								.then(user => {
									req.flash(
										'successMsg',
										'You are now registered and can log in'
									)
									res.redirect('/users/login')
								})
								.catch(err => console.log(err))
						}
					)
				)
			}
		})
	}
}

module.exports = { register }
