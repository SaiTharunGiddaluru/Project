const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name : process.env.CLOUDNAME,
    api_key : process.env.APIKEY,
    api_secret : process.env.APISECRET
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wanderlust_dev',
      allowerdFormats:["png","jpg","jpeg"],
      
    },
  });

  module.exports = {
    cloudinary,
    storage
  }