
const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAPTOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  }
  module.exports.newroute = (req,res)=>{
    
    res.render("listings/new.ejs");
  
}
module.exports.editRoute = async(req,res)=>{
    let {id} = req.params;
    let data = await Listing.findById(id);
    if(!data){
    req.flash("error","Listing Not Found!");
    }
    let originalUrl = data.image.url;
    originalUrl= originalUrl.replace("/upload","/upload/w_250")
    req.flash("success","Listing Updated!");
    res.render("listings/edit.ejs",{data,originalUrl});
  }
  module.exports.showRoute = async (req,res)=>{
    let {id} = req.params;
    let data = await Listing.findById(id).populate( {path: "reviews",populate:{path: "owner",},}).populate("owner");
    if(!data){
      req.flash("error","Listing Not Found!");
      res.redirect("/listings");
    }
    console.log(data);
    res.render("listings/show.ejs",{data});
}
module.exports.updateRoute = async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if( !listing.owner._id.equals( res.locals.currUser._id)){
      res.flash("error"," You don't have rights to edit ")
     return res.redirect(`/listings/${id}`);
    }
   let listing1 =  await Listing.findByIdAndUpdate(id,req.body.listing);
     if(typeof req.file !=="undefined"){
      let url = req.file.path;
      let filename = req.file.filename;
    listing1.image = {url,filename};
   await listing1.save();
   
     }
     req.flash("success","Listing Updated!");
     res.redirect(`/listings/${id}`);
  }
  module.exports.createRoute =  async(req,res,next)=>{
   let response = await geocodingClient.forwardGeocode({
      query: req.body.listing.location,
      limit: 1
    })
      .send();
      
      

    let url = req.file.path;
    let filename = req.file.filename;
    let newlist = new Listing(req.body.listing);
    newlist.owner = req.user._id;
    newlist.image = {url,filename};
    newlist.geometry = response.body.features[0].geometry
   let savedListing =await newlist.save();
   console.log(savedListing);
   req.flash("success","New Listing  Saved!");
    res.redirect("/listings");
}
module.exports.destroyRoute = async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
    
   
  }