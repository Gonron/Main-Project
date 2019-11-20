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

function findStoreByEmployeeId(employeeId) {
	return Store.find({
		$or: [
			{ 'empInfo.serviceConsultant._id': employeeId },
			{ 'empInfo.salesConsultant._id': employeeId }
		]
	}).exec()

	// return Store.find({ 'empInfo.serviceConsultant._id': employeeId }).exec()
	// Store.find({ 'empInfo.salesConsultant._id': employeeId }).exec()
}

function deleteStoreById(storeId) {
	return Store.deleteOne({ _id: storeId }).exec()
}

function deleteStoreByNumber(number) {
	return Store.deleteOne({ 'storeInfo.storeNum': number }).exec()
}

module.exports = {
	getAllStores,
	addStore,
	findStoreByName,
	findStoreByNumber,
	findStoreById,
	findStoreByEmployeeId,
	deleteStoreById,
	deleteStoreByNumber
}
