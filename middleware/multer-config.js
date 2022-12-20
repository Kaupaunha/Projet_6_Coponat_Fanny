// middleware for handling multipart/form-data, here for uploading files
const multer = require('multer');

// traduct type of files to handle extensions
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// save pictures into database
// multer needs 2 arguments : destination + filename
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images'); //save into "images" folder
  },
  filename: (req, file, callback) => {
    // create file name : take original name, split it and switch space with underscores
    const name = file.originalname.split(' ').join('_').split('.')[0];
    // create file extension
    const extension = MIME_TYPES[file.mimetype];
    // join name and extension + add time stamp
    callback(null, name + Date.now() + '.' + extension);
  }
});


// export multer, use const storage and say that it will only be images files
module.exports = multer({storage: storage}).single('image');