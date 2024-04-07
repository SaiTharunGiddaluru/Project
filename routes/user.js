const express = require("express");
const router = express.Router();
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync");
const listingcontroller = require("../controllers/user");

router.get("/signup",listingcontroller.RenderForm)

router.post("/signup",wrapAsync( listingcontroller.SubmitForm));

router.get("/login",listingcontroller.RenderLoginForm)
router.post(
    "/login", saveRedirectUrl,
     passport.authenticate("local",
     {failureRedirect:"/login",
       failureFlash: true
    }),
     listingcontroller.checkUser)
router.get("/logout",listingcontroller.logout)


module.exports = router;