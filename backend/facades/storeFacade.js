// Store model
const Store = require('../models/Store')

let getAllStores = () => {
	return Store.find({}).exec()
}

module.exports = { getAllStores }
