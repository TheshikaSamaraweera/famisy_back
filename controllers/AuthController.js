const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken'); 

const logIn = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(401).send({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_PRIVATE_KEY,
      { expiresIn: '7d' }
    );

    if (user.role === 'admin') {
      res.status(200).send({ data: token, message: 'Logged in as admin' });
    } else {
      res.status(200).send({ data: token, message: 'Logged in as user' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ message: 'Internal Server error' });
  }
};

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().required().label('Password'),
  });
  return schema.validate(data);
};

module.exports = { logIn };
