require('dotenv').config()

module.exports = {
	MongoURI: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER_NAME}-g61w7.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
	MongoURITest: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER_NAME}-g61w7.mongodb.net/${process.env.MONGO_TEST_DB_NAME}?retryWrites=true&w=majority`
}
