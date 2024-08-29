
const express = require("express");
const router = express.Router();
const { signupvalidation } = require("../helpers/validation");
const usercontrols = require("../controllers/usercontroler");

const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images'));
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});

const filefilter = (req, file, cb) => {
    console.log('moew ',file)
    if (file.mimetype == 'image/jpeg' || file.mimetype =='image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: filefilter
});


router.post("/register", upload.single("images"), signupvalidation, usercontrols.register);

module.exports = router;
