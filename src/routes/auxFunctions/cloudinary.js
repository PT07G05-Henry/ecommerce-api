require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const fse = require('fs-extra')

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

// elimina archivos temporales
const deleteImage = async function(filePath) {
    return await
   
    fse.unlink(filePath)
    
 }

 // elimina archivo de la nube

 const deleteImageCloud = async function (publicId) {
   return await cloudinary.uploader.destroy(publicId)
 }
 

 module.exports = { uploadImage, deleteImage, deleteImageCloud };