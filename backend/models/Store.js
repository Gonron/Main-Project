const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Employee Model
const { EmployeeSchema } = require('../models/Employee')

const StoreSchema = new Schema({
	storeInfo: {
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
		}
	},
	empInfo: {
		serviceConsultant: [EmployeeSchema],
		salesConsultant: [EmployeeSchema],
		visitDay: {
			type: String,
			required: true
		},
		priority: {
			type: String,
			enum: ['A', 'B', 'C', 'D'],
			required: true
		},
		frequency: {
			type: String,
			required: true
		}
	},
	containers: {
		CKS2Full: {
			type: Number
		},
		CKS2Split: {
			type: Number
		},
		CKS1High: {
			type: Number
		},
		CKS1Full: {
			type: Number
		},
		CKS1Low: {
			type: Number
		},
		CKSSmartLow: {
			type: Number
		},
		Parrot: {
			type: Number
		}
	},
	timeSpent: {
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
		}
	},
	avgAmount: {
		type: Number,
		required: true
	}
})

const Store = mongoose.model('Store', StoreSchema)

module.exports = Store
