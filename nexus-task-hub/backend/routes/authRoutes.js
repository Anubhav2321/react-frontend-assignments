const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  googleLogin,
  refreshToken,
  updateProfile
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google', googleLogin);
router.post('/refresh', refreshToken);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

module.exports = router;
