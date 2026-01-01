const { MongoClient } = require('mongodb');
const _uri = process.env.MONGODB_URI;

const dbConnection = (collection, cb) => {
    MongoClient.connect(_uri)
        .then(async (client) => {
            const db = client.db('medicine_platform').collection(collection);
            await cb(db);
            client.close();
        })
        .catch(console.error);
};

module.exports = dbConnection;
