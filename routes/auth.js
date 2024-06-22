const { logIn } = require('../controllers/AuthController');


const router = require('express').Router();

router.route('/').post(logIn);

module.exports = router;
