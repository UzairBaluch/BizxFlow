import { v2 as cloudinary } from "cloudinary";
import { promises as fs } from "node:fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function safeUnlink(p) {
  try {
    if (p) await fs.unlink(p);
  } catch {}
}

const uploadOnCloudinary = async (localPath) => {
  try {
    if (!localPath) return;
    const response = await cloudinary.uploader.upload(localPath, {
      resource_type: "auto",
    });
    await safeUnlink(localPath);
    return response;
  } catch (error) {
    await safeUnlink(localPath);
    console.log(error);
    return null;
  }
};

export { uploadOnCloudinary };
