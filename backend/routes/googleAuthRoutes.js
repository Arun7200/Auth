const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/login', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback after Google authentication
router.get('/callback', passport.authenticate('google', {
  successRedirect: '/dashboard', 
  failureRedirect: '/login'
}));

module.exports = router;