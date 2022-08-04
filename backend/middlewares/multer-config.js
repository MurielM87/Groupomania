const multer = require("multer")

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
}

//upload images for the user
const userStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images/users")
  },
 
  filename: (req, file, callback) => {
    const name = file.originalname.replace(/\.[^/.]+$/, "")
    const extension = MIME_TYPES[file.mimetype]
    callback(null, name + Date.now() + "." + extension)
  },
})

//upload images in the post
const postStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images/posts")
  },
 
  filename: (req, file, callback) => {
    const name = file.originalname.replace(/\.[^/.]+$/, "")
    const extension = MIME_TYPES[file.mimetype]
    callback(null, name + Date.now() + "." + extension)
  },
})

module.exports = multer({ storage: userStorage }).single("image");
module.exports = multer({ storage: postStorage }).single("image");