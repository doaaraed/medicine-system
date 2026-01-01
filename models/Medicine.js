const { dbConnection } = require('../configurations');


class Medicine {
static findAll(cb) {
dbConnection('main_medicines', async (collection) => {
const result = await collection.find({}).toArray();
cb(result);
});
}
}


module.exports = Medicine;