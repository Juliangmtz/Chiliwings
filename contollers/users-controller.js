const User = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user ||!(await user.comparePassword(password))) {
        return res.status(404).json({ message: 'Invalid email or password' });
      }
      const token = jwt.sign({ id: user._id }, "1234", { expiresIn: '1d' });
      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict'
      });
      res.status(200).json({
        userId: user._id,
        email: user.email
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

exports.logout = async (req, res) => {
    res.cookie("token", "", {expires: new Date(0)});
    return res.sendStatus(200);
}

exports.register = async (req, res) => {
    const { email, password, name, last_name } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, last_name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).send('User registered');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

