
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    // destination: (req, file, cb) => {
    //     cb(null, path.join(__dirname, '../uploads'));
    // },
    filename: (req, file, cb) => {
        const uniqeSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqeSuffix + ext);
    }
})

const upload = multer({ storage: storage });

module.exports = upload;