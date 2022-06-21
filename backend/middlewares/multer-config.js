const multer = require("multer")

// extension accepted
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
}

// settings for store users images
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "upload")
  },
  // settings for the file name to be unique
  filename: (req, file, callback) => {
    const name = file.originalname.replace(/\.[^/.]+$/, "")
    const extension = MIME_TYPES[file.mimetype]
    callback(null, name + Date.now() + "." + extension)
  },
})
// export this 1 file at the time accepted
module.exports = multer({ storage: storage }).single("image")