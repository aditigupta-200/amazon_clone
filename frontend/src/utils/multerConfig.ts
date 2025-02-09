// import multer from 'multer';
// import path from 'path';

// const storage = multer.memoryStorage(); // Store images in memory before uploading to Cloudinary

// const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
//   const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Invalid file type. Only JPEG, PNG, and WEBP are allowed.'));
//   }
// };

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
// });

// export default upload;
