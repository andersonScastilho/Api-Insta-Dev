const multer = require('multer');
const { v4 } = require('uuid');

const updload = multer({
  storage: multer.diskStorage({
    destination: 'uploads/',
    filename(req, file, callback) {
      const filename = `${v4()}-${file.originalname}`;
      return callback(null, filename);
    },

  }),
});

module.exports = { updload };
