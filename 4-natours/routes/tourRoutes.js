const express = require('express');

const router = express.Router();

const reviewController = require('./../controllers/reviewController');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restricTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

// POST /tour/3324234jk/reviews
// GET /tour/3324234jk/reviews
// GETT /tour/3324234jk/reviews/9d3v9s0

router
  .route('/:tourId/reviews')
  .post(
    authController.protect,
    authController.restricTo('user'),
    reviewController.createReview
  );

module.exports = router;
