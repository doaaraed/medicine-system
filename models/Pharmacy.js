const { dbConnection } = require('../configurations');


class Pharmacy {
static findAll(cb) {
dbConnection('pharmacies', async (collection) => {
const result = await collection.find({}).toArray();
cb(result);
});
}
}


module.exports = Pharmacy;