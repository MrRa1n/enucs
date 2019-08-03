const multer  = require('multer');

const storage = multer.diskStorage({
    destination: './public/images/',
    filename: (req, file, cb) => {
        cb(null, file.originalname, path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
}).single('image');

module.exports = upload;