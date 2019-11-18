// Store model
const Store = require('../models/Store')

function getAllStores() {
	return Store.find({}).exec()
}

function addStore(
	storeInfo = { storeNum, storeName, storeChain, address, zipCode, city, phone },
	empInfo = { serviceConsultant, salesConsultant, visitDay, priority, frequency },
	containers = { CKS2Full, CKS2Split, CKS1High, CKS1Full, CKS1Low, CKSSmartLow, Parrot },
	timeSpent = { timeSpentPM, timeSpentPacked, timeSpentTotal },
	avgAmount
) {
	return (newStore = Store({
		storeInfo,
		empInfo,
		containers,
		timeSpent,
		avgAmount
	}).save())
}

function findStoreByName(name) {
	return Store.findOne({ 'storeInfo.storeName': name }).exec()
}

function findStoreByNumber(number) {
	return Store.findOne({ 'storeInfo.storeNum': number }).exec()
}

function findStoreById(storeId) {
	return Store.findById({ _id: storeId }).exec()
}

module.exports = {
	getAllStores,
	addStore,
	findStoreByName,
	findStoreByNumber,
	findStoreById
}
