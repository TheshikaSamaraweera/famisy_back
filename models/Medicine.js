const mongoose = require('mongoose');
const joi = require('joi');

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});


const medicineValidate = function (data) {
  const schema = joi.object({
    name: joi.string().required().label('Name'),
    price: joi.number().required().label('Price'),
    quantity: joi.number().required().label('Quantity'),
    description: joi.string().required().label('Description'),
    category: joi.string().required().label('Category'),
    image: joi.string().required().label('Image'),
  });

  return schema.validate(data);
};

const Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = { Medicine, medicineValidate };
