const { User, validate } = require('../models/user');
const bcrypt = require('bcrypt');

const signUp = async (req, res) => {
  console.log('signUp', req.body);

  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res
        .status(400)
        .send({ message: 'User with given email already exists' });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      role: 'user',
    });
    console.log('user', user);
    await user.save();
    res.status(201).send({ message: 'User saved successfully' });
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Internal Server error', error: error.message });
  }
};

module.exports = { signUp };
