const multer = require("multer");

const storage = multer.diskStorage({});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extName = fileTypes.test(
      file.originalname.toLowerCase().split(".")[1]
    );
    if (extName) {
      return cb(null, true);
    } else {
      cb("Error: Images Only!");
    }
  },
});

module.exports = upload;
