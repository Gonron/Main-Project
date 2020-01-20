require('dotenv').config()
const moment = require('moment')

const googleMapsClient = require('@google/maps').createClient({
	key: process.env.GOOGLE_API_KEY,
	Promise: Promise
})

function googleApi(originAddress, destinationAddress, travelMode = 'driving') {
	return googleMapsClient
		.distanceMatrix({
			origins: originAddress,
			destinations: destinationAddress,
			mode: travelMode,
			language: 'da'
		})
		.asPromise()
		.then(res => {
			let respone = {
				originAddress: res.json.origin_addresses,
				destinationAddresses: res.json.destination_addresses,
				durations: {
					text: [],
					value: []
				},
				distances: {
					text: [],
					value: []
				}
			}
			let dataSource = res.json.rows[0].elements
			for (let i = 0; i < dataSource.length; i++) {
				respone.durations.text.push(dataSource[i].duration.text)
				respone.durations.value.push(dataSource[i].duration.value)
				respone.distances.text.push(dataSource[i].distance.text)
				respone.distances.value.push(dataSource[i].distance.value)
			}
			return respone
		})
		.catch(err => {
			console.log(err)
		})
}

/* These functions below do not work as inteded
 * - In order to calculate a proper route i would need to keep sending requests
 *   to the api, where i will change the originAddress, to the one that is
 * 	 the cloest to the prev. originAddress
 *
 */

function indexOfMin(arr) {
	let min = arr[0]
	let minIndex = 0

	for (let i = 0; i < arr.length; i++) {
		if (arr[i] < min) {
			minIndex = i
			min = arr[i]
		}
	}
	return minIndex
}

function calcMinIndexRoute(data) {
	let routeIndex = []
	let arr = [...data.durations.value]

	for (let i = 0; i < arr.length; i++) {
		let index = indexOfMin(arr)
		routeIndex.push(index)
		// Find another way to "remove" the index
		arr[index] = 2 * 100000
	}
	return routeIndex
}

function dataFormatter(data) {
	let routeIndex = calcMinIndexRoute(data)
	let totalDuration = 0
	let totalDistance = 0
	routeIndex.map(index => {
		totalDuration += data.durations.value[index]
		totalDistance += data.distances.value[index]
	})

	let durationFormatted = moment.utc(totalDuration * 1000).format('HH:mm:ss')
	let distanceFormatted = totalDistance / 1000
	return { durationFormatted, distanceFormatted }
}

async function routeCalculator(empAddress, storeAddresses, travelMode) {
	let routeInformation = {
		originAddress: [],
		destinationAddress: [],
		duration: [],
		distance: []
	}

	let data
	let length = storeAddresses.length
	for (let i = 0; i < length; i++) {
		data = await googleApi(empAddress, storeAddresses, travelMode)
		let arr = [...data.durations.value]

		let nearestStoreIndex = indexOfMin(arr)

		empAddress = storeAddresses[nearestStoreIndex]
		storeAddresses.splice(nearestStoreIndex, 1)

		routeInformation.originAddress.push(data.originAddress[0])
		routeInformation.destinationAddress.push(data.destinationAddresses[nearestStoreIndex])
		routeInformation.duration.push(data.durations.text[nearestStoreIndex])
		routeInformation.distance.push(data.distances.text[nearestStoreIndex])
	}
	return {
		routeInformation
	}
}

module.exports = {
	googleApi,
	routeCalculator,
	dataFormatter
}
