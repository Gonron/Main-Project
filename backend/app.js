const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')

const app = express()

// Passport config
require('./config/passport')(passport)

// DB Config
const db = require('./config/keys').MongoURI

// Connect to Mongo
mongoose
	.connect(db, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
	.then(() => console.log('MongoDB Connected...'))
	.catch(err => console.log('Error:', err))

// EJS
app.use(expressLayouts)
app.set('view engine', 'ejs')

// Bodyparser
app.use(express.urlencoded({ extended: false }))

// Express Session
app.use(
	session({
		secret: 'secret',
		resave: true,
		saveUninitialized: true
	})
)

// Passport
app.use(passport.initialize())
app.use(passport.session())

// Connect Flash
app.use(flash())

// Global Variables
app.use((req, res, next) => {
	res.locals.successMsg = req.flash('successMsg')
	res.locals.errorMsg = req.flash('errorMsg')
	res.locals.error = req.flash('error')
	next()
})

// Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))
app.use('/stores', require('./routes/stores'))
app.use('/employees', require('./routes/employees'))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server started on port ${PORT}`))
