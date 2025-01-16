const cloudinary = require('../config/cloudinary');

// Delete a file from Cloudinary
const deleteFileFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId, { invalidate: true });
  } catch (error) {
    console.error('Cloudinary Delete Error:', error);
    throw new Error('Failed to delete file from Cloudinary');
  }
};

// Upload file to Cloudinary (Profile Pic)
const uploadProfilePic = async (filePath, folder) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: 'image',
      type: "upload", // Ensures the file is publicly accessible
    });
    return result;
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    throw new Error('Failed to upload file to Cloudinary');
  }
};

// Upload file to Cloudinary (CV)
const uploadCvFile = async (filePath, folder) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: 'auto',
      type: "upload", // Ensures the file is publicly accessible
      access_mode: "public", // Explicitly set public access
    });
    return result;
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    throw new Error('Failed to upload file to Cloudinary');
  }
};

module.exports = { uploadProfilePic, uploadCvFile, deleteFileFromCloudinary };
