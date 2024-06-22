const router = require('express').Router();
const { addMedicine } = require('../controllers/MedicineController');
const { getAllOrders } = require('../controllers/OrderController');

router.route('/add-medicine').post(addMedicine);
router.route('/get-all-orders').get(getAllOrders);

module.exports = router;
