const express = require('express');
const viewsCotroller = require('./../controller/viewsController');
const authCotroller = require('./../controller/authController');
const bookingCotroller = require('./../controller/bookingController');

const router = express.Router();

router.get(
  '/',
  bookingCotroller.createBookingCheckout,
  authCotroller.isLoggedIn,
  viewsCotroller.getOverview
);

router.get(`/tour/:slug`, authCotroller.isLoggedIn, viewsCotroller.getTour);
router.get('/login', authCotroller.isLoggedIn, viewsCotroller.getLoginForm);
router.get('/signup', viewsCotroller.getSignUpForm);
router.get('/me', authCotroller.protect, viewsCotroller.getAccount);
router.get('/my-tours', authCotroller.protect, viewsCotroller.getMyTours);

router.post(
  '/submit-user-data',
  authCotroller.protect,
  viewsCotroller.updateUserData
);

module.exports = router;
