const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".");
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + ext.at(-1);
    console.log(uniqueSuffix)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

module.exports = upload;