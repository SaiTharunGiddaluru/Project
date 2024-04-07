

const User = require("../models/User.js");

module.exports.RenderForm = (req,res)=>{
    res.render("users/signup.ejs");
}
module.exports.SubmitForm = async(req,res)=>{
    try{
    let {username,email,password}= req.body;
    console.log(req.body);
    const newUser = new User({email,username});
      let registereduser = await User.register(newUser,password);
      console.log(registereduser);
      req.login(registereduser,(err)=>{
        if(err){
            return next(err);
          }
          req.flash("success","Welcome to Our Wanderlust");
          res.redirect("/listings");
      })
     
    
    }catch(e){
        console.log(e);
        req.flash("error",e.message);
        res.redirect("/signup");
    } 

}
module.exports.RenderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
}
module.exports.checkUser = async(req,res)=>{
    const redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
}
module.exports.logout = (req,res)=>{
    req.logOut((err)=>{
        if(err){
          return next(err);
        }
        req.flash("success","You are LoggedOut Successfully!");
        res.redirect("/listings");
    })
}