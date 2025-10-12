const { ObjectId } = require('bson');
const createError = require('http-errors');
const { dbConnection } = require('../configurations');


const getMedicines = (req, res, next) => {
dbConnection('main_medicines', async (collection) => {
try {
const medicines = await collection.find({}).toArray();
res.json(medicines);
} catch (err) {
next(createError(500, err.message));
}
});
};

const addMedicine = (req, res, next) => {
  const { name, company, available } = req.body;

  if (!name || !company || typeof available !== 'boolean') {
    return next(createError(400, 'All fields are required (name, company, available)'));
  }

  dbConnection('main_medicines', async (collection) => {
    try {
      const result = await collection.insertOne({ name, company, available });
      res.status(201).json({ success: true, id: result.insertedId });
    } catch (err) {
      next(createError(500, err.message));
    }
  });
};

const updateMedicine = (req, res, next) => {
  const { id } = req.params;
  const { name, company, available } = req.body;

  if (!name || !company || typeof available !== 'boolean') {
    return next(createError(400, 'All fields are required (name, company, available)'));
  }

  dbConnection('main_medicines', async (collection) => {
    try {
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { name, company, available } }
      );

      if (result.matchedCount === 0) {
        return next(createError(404, 'Medicine not found'));
      }

      res.json({ success: true, message: 'Medicine updated' });
    } catch (err) {
      next(createError(500, err.message));
    }
  });
};

const deleteMedicine = (req, res, next) => {
  const { id } = req.params;

  dbConnection('main_medicines', async (collection) => {
    try {
      const result = await collection.deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) {
        return next(createError(404, 'Medicine not found'));
      }

      res.json({ success: true, message: 'Medicine deleted' });
    } catch (err) {
      next(createError(500, err.message));
    }
  });
};


module.exports = {
getMedicines,
  addMedicine,
  updateMedicine,
  deleteMedicine,
};