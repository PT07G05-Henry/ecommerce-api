require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const fs = require("fs")

cloudinary.config({ 
    cloud_name: 'dvo6rbpz9', 
    api_key: '989985351775395', 
    api_secret: 'xUdg0HNPpBvRdu-ntEpKe76WKWw',
    secure: true
  });

  const uploadImage = async function(filePath) {
   return await
   cloudinary.uploader.upload(filePath, {
    folder: 'replit'
   })
   
}
 
        
       
 

module.exports = { uploadImage };
