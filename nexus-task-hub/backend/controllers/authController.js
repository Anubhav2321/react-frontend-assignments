const User = require('../models/User');
const { createSigner, createVerifier } = require('fast-jwt');
const { OAuth2Client } = require('google-auth-library');

// Signers for tokens
const signAccessToken = createSigner({ key: process.env.JWT_SECRET, expiresIn: 15 * 60 * 1000 }); // 15 minutes
const signRefreshToken = createSigner({ key: process.env.JWT_SECRET, expiresIn: 7 * 24 * 60 * 60 * 1000 }); // 7 days
const verifyToken = createVerifier({ key: process.env.JWT_SECRET });

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateTokens = (id) => {
  const accessToken = signAccessToken({ id });
  const refreshToken = signRefreshToken({ id });
  return { accessToken, refreshToken };
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please add all fields' });
  }

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        ...generateTokens(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // Handle users who registered via Google and might not have a password
    if (user && !user.password) {
       return res.status(400).json({ message: 'Please login using Google' });
    }

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        ...generateTokens(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  res.status(200).json(req.user);
};

// @desc    Google Sign-In / Sign-Up
// @route   POST /api/auth/google
// @access  Public
const googleLogin = async (req, res) => {
  const { credential } = req.body;

  if (!credential) {
    return res.status(400).json({ message: 'Google credential token is required' });
  }

  try {
    let googleId, email, name;

    // Check if it's a JWT (ID Token) or an Access Token. JWTs always start with 'eyJ' (Base64 for '{"')
    if (credential.startsWith('ey')) {
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      googleId = payload.sub;
      email = payload.email;
      name = payload.name;
    } else {
      // It's an Access Token from useGoogleLogin implicit flow
      const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${credential}` }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user profile from Google');
      }
      const payload = await response.json();
      googleId = payload.sub;
      email = payload.email;
      name = payload.name;
    }

    let user = await User.findOne({ email });

    if (!user) {
      // Create new user
      user = await User.create({
        name,
        email,
        googleId,
        // Password is not required based on schema
      });
    } else if (!user.googleId) {
      // Link Google account to existing email
      user.googleId = googleId;
      await user.save();
    }

    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      ...generateTokens(user._id),
    });

  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(401).json({ message: 'Invalid Google token' });
  }
};

// @desc    Refresh Access Token
// @route   POST /api/auth/refresh
// @access  Public
const refreshToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: 'Refresh token required' });
  }

  try {
    const decoded = verifyToken(token);
    
    // Ensure the token actually belongs to an existing user
    const user = await User.findById(decoded.id);
    if (!user) {
       return res.status(401).json({ message: 'User no longer exists' });
    }

    // Generate a new access token
    const newAccessToken = signAccessToken({ id: user._id });
    
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    console.error('Refresh Token Error:', error);
    res.status(401).json({ message: 'Invalid or expired refresh token' });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      ...generateTokens(updatedUser._id), // Optionally re-issue tokens
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  googleLogin,
  refreshToken,
  updateProfile,
};
