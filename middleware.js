const ExpressError = require("./utils/ExpressError");
const {ListingSchema,reviewSchema} = require("./Schema");

module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
      req.session.redirectUrl = req.originalUrl;
        req.flash("error","you have to login first!");
        return res.redirect("/login");      
      }
      next();
}
module.exports.saveRedirectUrl = (req,res,next)=>{
  if( req.session.redirectUrl){
    res.locals.redirectUrl= req.session.redirectUrl;

  }
  next();
}
module.exports.validateSchema = (req,res,next)=>{
  let {error}=ListingSchema.validate(req.body);
  if(error){
    let errmsg = error.details.map((el)=>el.message)
      req.flash("error","Please enter a Valid Number in Price")
      res.redirect("/listings/new");
  }else{
    next();
  }
}

module.exports.validateReview = (req,res,next)=>{
  let {error}=reviewSchema.validate(req.body);
  if(error){
    let errmsg = error.details.map((el)=>el.message)
   throw new ExpressError(400,errmsg);
  }else{
    next();
  }
}