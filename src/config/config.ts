import { request } from 'express';
import multer from 'multer';
const googleStorage = require('@google-cloud/storage');
import path from 'path';
import crypto from 'crypto';
const crypt =crypto.randomBytes(16)

const storage = googleStorage({
    projectId: "eatgreen-355e9",
    keyFilename: "AAAAWyZfF9Q:APA91bGvpd_Hks6C78hh1TAM1SD1-H-5XhFiyc2C0ZG6_NaM_uXqJtleRB8b-O4RUnw6NHdmAzIqN2lx_RqcC6zXghoyDn1XEMaiskUxlWtv9sPFLLVYu86-DuCJLjQ9VC_TtfqFYBqs"
  });
  
  const bucket = storage.bucket("gs://eatgreen-355e9.appspot.com");
  

export default{
    
    /*storage:multer.diskStorage({
        destination: path.join(__dirname,'..','..','uploads'),
        filename:(request,file,cb) => {
            const fileName = `${crypt.toString('hex')}-${file.originalname}`;
            cb(null,fileName)
        },
    }),*/


    uploadImageToStorage: (file: any) => {
        return new Promise((resolve, reject) => {
          if (!file) {
            reject('No image file');
          }
          let newFileName = `${file.originalname}_${Date.now()}`;
      
          let fileUpload = bucket.file(newFileName);
      
          const blobStream = fileUpload.createWriteStream({
            metadata: {
              contentType: file.mimetype
            }
          });
      
          blobStream.on('error', (error: any) => {
            reject('Something is wrong! Unable to upload at the moment.');
          });
      
          blobStream.on('finish', () => {
            // The public URL can be used to directly access the file via HTTP.
            const url = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`
            resolve(url);
          });
      
          blobStream.end(file.buffer);
        });
    }
}