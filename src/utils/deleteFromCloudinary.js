import { v2 as cloudinary } from "cloudinary";

const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) return;
    const deleteFile = await cloudinary.uploader.destroy(publicId);
    return deleteFile;
  } catch (error) {
    return null;
  }
};

export { deleteFromCloudinary };
