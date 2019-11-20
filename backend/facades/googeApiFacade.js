require('dotenv').config()

const googleMapsClient = require('@google/maps').createClient({
	key: process.env.GOOGLE_API_KEY,
	Promise: Promise
})

function googleApi(originAddress, destinationAddress) {
	return googleMapsClient
		.distanceMatrix({
			origins: originAddress,
			destinations: destinationAddress,
			mode: 'driving',
			language: 'dk'
		})
		.asPromise()
		.then(res => {
			return {
				originAddress: res.json.origin_addresses,
				destinationAddress: res.json.destination_addresses,
				duration: res.json.rows[0].elements[0].duration.text,
				distance: res.json.rows[0].elements[0].distance.text
			}
		})
		.catch(err => {
			console.log(err)
		})
}

module.exports = {
	googleApi
}
