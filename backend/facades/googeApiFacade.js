require('dotenv').config()

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
			language: 'dk'
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

module.exports = {
	googleApi
}
