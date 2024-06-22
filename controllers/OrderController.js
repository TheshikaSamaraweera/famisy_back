const { Order } = require('../models/Order');
const { orderValidate } = require('../models/Order');

const addOrder = async (req, res) => {

  const { error } = orderValidate(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }




  const order = new Order({
    user: req.body.user,
    medicines: req.body.medicines,
    totalAmount: req.body.totalAmount,
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    nicNumber: req.body.nicNumber,
    DOB: req.body.DOB,
    address: req.body.address,
  });
  console.log(order);

  await order
    .save()
    .then((order) => {
      res
        .status(201)
        .send({ data: order, message: 'Order saved successfully' });
    })
    .catch((error) => {
      res.status(500).send({ message: 'Internal Server error' });
    });
};


const getAllOrders = async (req, res) => {
  await Order.find()
    .then((orders) => {
      res.status(200).send({ data: orders });
    })
    .catch((error) => {
      res.status(500).send({ message: 'Internal Server error' });
    });
};

module.exports = { addOrder, getAllOrders };
