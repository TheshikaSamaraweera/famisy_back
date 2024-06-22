const mongoose = require('mongoose');
const joi = require('joi');

const orderSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  nicNumber: {
    type: String,
    required: true,
  },
  DOB: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  medicines: [
    {
      medicine: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
});


const orderValidate = function (data) {
  const schema = joi.object({
    firstName: joi.string().required().label('First Name'),
    lastName: joi.string().required().label('Last Name'),
    nicNumber: joi.string().required().label('NIC Number'),
    DOB: joi.date().required().label('Date of Birth'),
    address: joi.string().required().label('Address'),
    medicines: joi
      .array()
      .items(
        joi.object({
          medicine: joi.string().required().label('Medicine'),
          quantity: joi.number().required().label('Quantity'),
        })
      )
      .required()
      .label('Medicines'),
    totalAmount: joi.number().required().label('Total Amount'),
  });

  return schema.validate(data);
};

const Order = mongoose.model('Order', orderSchema);

module.exports = { Order, orderValidate };
