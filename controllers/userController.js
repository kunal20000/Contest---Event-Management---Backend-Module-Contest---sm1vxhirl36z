const users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const registerUser = async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    if (password === cpassword) {
      const newUser = new users({
        name: req.body.name,
        password: hashedPass,
        email: req.body.email,
        confirmpassword: req.body.confirmpassword,
      });

      const user = await newUser.save();

      // No need to generate a JWT token here
      res.status(200).json(user);
    } else {
      res.status(404).send('Incorrect Data');
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

// Checking if the user exists and logging in
const loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await users.findOne({
      email: email,
    });

    if (!user) {
      return res.status(404).send('User not found');
    }

    // Comparing our hash with the provided password
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      console.log(token);

      res.status(201).json({
        token: token,
        user: user,
      });
    } else {
      res.send('Error Details Incorrect');
    }
  } catch (error) {
    res.status(404).send(error);
  }
};
// Logout User
const logoutUser = async (req, res) => {
  try {
    const user = await users.findById(req.params.id);

    if (user.email === req.body.email) {
      try {
        await user.delete();
        res.status(201).json('User Deleted');
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(500).send('Error deleting User');
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

//Updating Password
const updatePasword = async (req, res) => {
  try {
    const User = await users.findById(req.params.id);
    if (User.email === req.body.email) {
      try {
        const updatedPassword = await users.findByIdAndUpdate(
          req.params.id,
          {
            $set: { password: req.body.password },
          },
          { new: true }
        );
        res.status(201).send(updatedPassword);
      } catch (error) {
        res.status(404).json(error);
      }
    } else {
      res.status(404).send('Email not valid');
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = { registerUser, loginUser, logoutUser, updatePasword };
