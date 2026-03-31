import { v2 as cloudinary } from "cloudinary";

const extractPublicIdFromCloudinaryUrl = (url) => {
  if (!url || typeof url !== "string") return null;
  if (!url.includes("res.cloudinary.com")) return null;

  try {
    const { pathname } = new URL(url);
    const uploadSegment = "/upload/";
    const uploadIndex = pathname.indexOf(uploadSegment);
    if (uploadIndex === -1) return null;

    const afterUpload = pathname.slice(uploadIndex + uploadSegment.length);
    const withoutVersion = afterUpload.replace(/^v\d+\//, "");
    const withoutExtension = withoutVersion.replace(/\.[^/.]+$/, "");

    return withoutExtension || null;
  } catch {
    return null;
  }
};

const resolveDeleteTarget = (identifier) => {
  if (!identifier || typeof identifier !== "string") return null;
  if (identifier.includes("res.cloudinary.com")) {
    return extractPublicIdFromCloudinaryUrl(identifier);
  }
  return identifier;
};

const deleteFromCloudinary = async (identifier) => {
  try {
    const publicId = resolveDeleteTarget(identifier);
    if (!publicId) {
      console.warn("[Cloudinary] Skipping delete: invalid target");
      return null;
    }

    const deleteFile = await cloudinary.uploader.destroy(publicId);
    return deleteFile;
  } catch (error) {
    console.error("[Cloudinary] Delete failed", error?.message || error);
    return null;
  }
};

export { deleteFromCloudinary };
