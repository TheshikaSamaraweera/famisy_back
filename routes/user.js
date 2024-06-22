const router = require('express').Router();

const { getAllMedicine } = require('../controllers/MedicineController');
const { addOrder } = require('../controllers/OrderController');
const { signUp } = require('../controllers/UserController');
const { extractTextAndCheck } = require('../controllers/PdfCheck');

router.route('/').post(signUp);

router.route('/get-all-medicine').get(getAllMedicine);

router.route('/place-order').post(addOrder);
router.post('/extract-and-check', extractTextAndCheck);


module.exports = router;
