const multer = require("multer");

//storage configuration

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}-${file.originalname}`);
  },
});

//optional to add file filter
const fileFilter = (req, file, callback) => {
  if (
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

//create middleware
const upload = multer({ storage, fileFilter });
module.exports = upload;
