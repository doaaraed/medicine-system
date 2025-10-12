const createError = require('http-errors');
const { dbConnection } = require('../configurations');
const { ObjectId } = require('bson');


const getPharmacies = (req, res, next) => {
dbConnection('pharmacies', async (collection) => {
try {
const pharmacies = await collection.find({ city: 'Gaza' }).toArray();
res.json(pharmacies);
} catch (err) {
next(createError(500, err.message));
}
});
};


const addPharmacy = (req, res, next) => {
  const { name, location, phone, city } = req.body;

  if (!name || !location || !phone || !city) {
    return next(createError(400, 'All fields are required'));
  }

  dbConnection('pharmacies', async (collection) => {
    try {
      const result = await collection.insertOne({ name, location, phone, city });
      res.status(201).json({ success: true, id: result.insertedId });
    } catch (err) {
      next(createError(500, err.message));
    }
  });
};

//Update
const updatePharmacy = (req, res, next) => {
  const { id } = req.params;
  const { name, location, phone, city } = req.body;

  if (!name || !location || !phone || !city) {
    return next(createError(400, 'All fields are required'));
  }

  dbConnection('pharmacies', async (collection) => {
    try {
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { name, location, phone, city } }
      );

      if (result.matchedCount === 0) {
        return next(createError(404, 'Pharmacy not found'));
      }

      res.json({ success: true, message: 'Pharmacy updated' });
    } catch (err) {
      next(createError(500, err.message));
    }
  });
};

//Delet from Pharmacy
const deletePharmacy = (req, res, next) => {
  const { id } = req.params;

  dbConnection('pharmacies', async (collection) => {
    try {
      const result = await collection.deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) {
        return next(createError(404, 'Pharmacy not found'));
      }

      res.json({ success: true, message: 'Pharmacy deleted' });
    } catch (err) {
      next(createError(500, err.message));
    }
  });
};


module.exports = {
getPharmacies,
addPharmacy,
deletePharmacy,
updatePharmacy
};