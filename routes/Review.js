
const express = require("express");
const router = express.Router({mergeParams : true});

const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/Review.js");
const { isLoggedIn, validateReview } = require("../middleware.js");

const listingcontroller = require("../controllers/review.js");


  router.post("/",isLoggedIn,validateReview,wrapAsync( listingcontroller.postReview));
  router.delete("/:reviewId",isLoggedIn,wrapAsync(listingcontroller.destroyReview))

  module.exports = router;