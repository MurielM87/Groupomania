const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif' : 'gif'
};

//definition of the storage
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
      callback(null, 'images')
  },
  //definition of the filename image
  filename: (req, file, callback) => {
     console.log(file)
      //verify if the extension is allowed in all the authorized extnesions
      if (file.mimetype in MIME_TYPES) {
          const extension = MIME_TYPES[file.mimetype];

          //remove the extension from the filename
          let name = file.originalname.split('.');
          name = name[0];

          //filename + date + extension
          name = name.split(' ').join('_');
          callback(null, name + Date.now() + '.' + extension);
          
      } else {
          callback(false, '');
          return false;
      }      
  },
});

module.exports = multer({ storage }).single('image');
