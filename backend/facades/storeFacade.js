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
		{ $set: { storeInfo, empInfo, containers, timeSpent, avgAmount } },
		{ runValidators: true }
	).exec()
}

function deleteStoreById(storeId) {
	return Store.deleteOne({ _id: storeId }).exec()
}

function deleteStoreByNumber(number) {
	return Store.deleteOne({ 'storeInfo.storeNum': number }).exec()
}

function storeValidation(body) {
	let errors = []

	// Check required fields
	for (let key in body) {
		if (body[key] === '') {
			errors.push({ msg: 'Please fill in all fields' })
			break
		}
	}

	// Check zipcode
	if (body.zipCode.length != 4) {
		errors.push({ msg: 'Invalid zipcode - Should be 4 digits' })
	}

	// Check address
	if (!body.address.includes(body.zipCode) || !body.address.includes(body.city)) {
		errors.push({ msg: 'address must have zipcode and city in it' })
	}

	// Check phone
	if (body.phone.length != 8) {
		errors.push({ msg: 'Invalid number - Should be 8 digits' })
	}
	return errors
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
	deleteStoreByNumber,
	storeValidation
}
