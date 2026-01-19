const { ObjectId } = require('mongodb');
const createError = require('http-errors');
const { dbConnection } = require('../configurations');
const { readCsv } = require("../utils/csvDb");

const getAlternatives = async (req, res, next) => {
  try {
    const alternatives = await readCsv("alternative_medicines.csv");
    res.json(alternatives);
  } catch (err) {
    next(createError(500, err.message));
  }
};


// const addAlternative = (req, res, next) => {
//   const { main_medicine_id, alternative_medicine_name, pharmacy_ids } = req.body;

//   if (!main_medicine_id || !alternative_medicine_name || !pharmacy_ids) {
//     return next(createError(400, 'All fields are required'));
//   }

//   dbConnection('alternative_medicines', async (collection) => {
//     try {
//       await collection.insertOne({
//         main_medicine_id: new ObjectId(main_medicine_id),
//         alternative_medicine_name,
//         pharmacy_ids: pharmacy_ids.map(id => new ObjectId(id))
//       });
//       res.status(201).json({ success: true, message: 'Alternative added' });
//     } catch (err) {
//       next(createError(500, err.message));
//     }
//   });
// };

// const getAlternatives = (req, res, next) => {
//   dbConnection('alternative_medicines', async (collection) => {
//     try {
//       const alternatives = await collection.find().toArray();
//       res.json(alternatives);
//     } catch (err) {
//       next(createError(500, err.message));
//     }
//   });
// };

const updateAlternative = (req, res, next) => {
  const { id } = req.params;
  const { alternative_medicine_name, pharmacy_ids } = req.body;

  dbConnection('alternative_medicines', async (collection) => {
    try {
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            alternative_medicine_name,
            pharmacy_ids: pharmacy_ids.map(id => new ObjectId(id))
          }
        }
      );
      res.json({ success: true, message: 'Alternative updated' });
    } catch (err) {
      next(createError(500, err.message));
    }
  });
};

const deleteAlternative = (req, res, next) => {
  const { id } = req.params;

  dbConnection('alternative_medicines', async (collection) => {
    try {
      await collection.deleteOne({ _id: new ObjectId(id) });
      res.json({ success: true, message: 'Alternative deleted' });
    } catch (err) {
      next(createError(500, err.message));
    }
  });
};

module.exports = {
  getAlternatives,
  updateAlternative,
  deleteAlternative
};
