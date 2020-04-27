const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

//By default each router only has access to the paramters of their specific routes.
//So we set the mergeParams true to also have access to the params that comes from
//the tourRouter
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(authController.protect, reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restricTo('user'),
    reviewController.createReview
  );

module.exports = router;
