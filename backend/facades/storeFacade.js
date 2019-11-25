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

function findOneStoreByName(name) {
	return Store.findOne({ 'storeInfo.storeName': name }).exec()
}

function findStoresByName(name) {
	return Store.find({ 'storeInfo.storeName': new RegExp(name, 'i') }).exec()
}

function findOneStoreByNumber(number) {
	return Store.findOne({ 'storeInfo.storeNum': number }).exec()
}

function findOneStoreById(storeId) {
	return Store.findById({ _id: storeId }).exec()
}

function findStoresByEmployeeId(employeeId) {
	return Store.find({
		$or: [
			{ 'empInfo.serviceConsultant._id': employeeId },
			{ 'empInfo.salesConsultant._id': employeeId }
		]
	}).exec()
}

function findStoresByEmployeedAndEmpVisitDay(employeeId, visitDay) {
	return Store.find({
		$and: [
			{
				$or: [
					{ 'empInfo.serviceConsultant._id': employeeId },
					{ 'empInfo.salesConsultant._id': employeeId }
				]
			},
			{ 'empInfo.visitDay': new RegExp(visitDay, 'i') }
		]
	}).exec()
}

function updateStoreById(storeId, storeInfo, empInfo, containers, timeSpent, avgAmount) {
	return Store.findOneAndUpdate(
		{ _id: storeId },
		{ $set: { storeInfo, empInfo, containers, timeSpent, avgAmount } }
	).exec()
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
	findOneStoreByName,
	findStoresByName,
	findOneStoreByNumber,
	findOneStoreById,
	findStoresByEmployeeId,
	findStoresByEmployeedAndEmpVisitDay,
	updateStoreById,
	deleteStoreById,
	deleteStoreByNumber
}
