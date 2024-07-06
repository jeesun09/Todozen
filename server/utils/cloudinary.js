import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const uploadAvatarOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      console.log("cloudinary.js: !localFilePath not uploaded");
      return null;
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.log("cloudinary.js: catch", error);
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export default uploadAvatarOnCloudinary;
