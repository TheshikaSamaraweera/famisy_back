const { Medicine } = require('../models/Medicine');
const { medicineValidate } = require('../models/Medicine');

const addMedicine = async (req, res) => {

  const { error } = medicineValidate(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  const medicine = new Medicine({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    quantity: req.body.quantity,
    category: req.body.category,
    image: req.body.image,
  });
  await medicine
    .save()
    .then((medicine) => {
      res
        .status(201)
        .send({ data: medicine, message: 'Medicine saved successfully' });
    })
    .catch((error) => {
      res.status(500).send({ message: 'Internal Server error' });
    });
};

const getAllMedicine = async (req, res) => {
  await Medicine.find()
    .then((medicines) => {
      res.status(200).send({ data: medicines });
    })
    .catch((error) => {
      res.status(500).send({ message: 'Internal Server error' });
    });
};

module.exports = { addMedicine, getAllMedicine };
