const express = require("express");
const router = express.Router();


const wrapAsync = require("../utils/wrapAsync.js");

const {isLoggedIn,validateSchema}= require("../middleware.js");
 
const listingcontroller = require("../controllers/listing.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js")
const upload = multer({storage });

 router.route("/")
 .get(wrapAsync( listingcontroller.index))
   .post(isLoggedIn,upload.single("listing[image]"),validateSchema,wrapAsync( listingcontroller.createRoute))


 router.get("/new",isLoggedIn,listingcontroller.newroute);
 
 router.get("/:id/edit",isLoggedIn,wrapAsync( listingcontroller.editRoute));
  
 router.route("/:id")
 .get(wrapAsync(listingcontroller.showRoute))
 .put(isLoggedIn,upload.single("listing[image]"),validateSchema,wrapAsync(listingcontroller.updateRoute))
 .delete(isLoggedIn,wrapAsync(listingcontroller.destroyRoute))
  module.exports = router;