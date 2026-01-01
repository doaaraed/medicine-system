const { dbConnection } = require('../configurations')
// require('dotenv').config();
const { hashSync } = require('bcryptjs')

class User {
    constructor(userData) {
        this.userData = userData;
    }

    async save() {
        this.userData.password = hashSync(this.userData.password, 12);
        return new Promise((resolve, reject) => {
            dbConnection('users', async (collection) => {
                try {
                    const result = await collection.insertOne(this.userData);
                    resolve({ status: true, id: result.insertedId });
                } catch (err) {
                    reject({ status: false, message: err.message });
                }
            });
        });
    }

    static async findByUsername(username) {
        return new Promise((resolve, reject) => {
            dbConnection('users', async (collection) => {
                try {
                    const user = await collection.findOne({ username });
                    resolve(user);
                } catch (err) {
                    reject(err);
                }
            });
        });
    }
}




module.exports = User;
