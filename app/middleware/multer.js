const multer = require("multer");
const path = require("path");

// const publicDirectory = path.join(_dirname, "public");
// const uploadDirectory = path.join(publicDirectory, "uploads");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// file valid
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//     cb(null, tree);
//   } else {
//     cb({ message: "Unsupported File Format" }, false);
//   }
// };

// const upload = multer({
//   storage: storage,
//   //   limits: { fileSize: 1024 * 1024 },
//   //   fileFilter: fileFilter,
// });

module.exports = multer({ storage: storage });
