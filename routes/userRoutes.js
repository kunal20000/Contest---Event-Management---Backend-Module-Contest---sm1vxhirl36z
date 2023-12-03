const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  updatePasword,
} = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.delete('/logout/:id', logoutUser);
router.put('/update/:id', updatePasword);

module.exports = router;
