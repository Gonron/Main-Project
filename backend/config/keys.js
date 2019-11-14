require('dotenv').config()

module.exports = {
	MongoURI: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER_NAME}-g61w7.mongodb.net/test?retryWrites=true&w=majority`
}
