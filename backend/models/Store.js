const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StoreSchema = new Schema({
	storeNum: {
		type: Number,
		required: true
	},
	storeName: {
		type: String,
		required: true
	},
	storeChain: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	zipCode: {
		type: Number,
		required: true
	},
	city: {
		type: String,
		required: true
	},
	phone: {
		type: Number,
		required: true
	},
	serviceConsultant: {
		type: String,
		required: true
	},
	salesConsultant: {
		type: String,
		required: true
	},
	visitDay: {
		type: String,
		required: true
	},
	priority: {
		type: String,
		enum: ['A', 'B', 'C', 'D', 'E'],
		required: true
	},
	frequency: {
		type: String,
		required: true
	},
	CKS2Full: {
		type: Number,
		default: 0
	},
	CKS2Split: {
		type: Number,
		default: 0
	},
	CKS1High: {
		type: Number,
		default: 0
	},
	CKS1Full: {
		type: Number,
		default: 0
	},
	CKS1Low: {
		type: Number,
		default: 0
	},
	CKSSmartLow: {
		type: Number,
		default: 0
	},
	Parrot: {
		type: Number,
		default: 0
	},
	timeSpentPM: {
		type: String,
		required: true
	},
	timeSpentPacked: {
		type: String,
		required: true
	},
	timeSpentTotal: {
		type: String,
		required: true
	},
	avgAmount: {
		type: Number,
		required: true
	}
})

const Store = mongoose.model('Store', StoreSchema)

module.exports = Store
