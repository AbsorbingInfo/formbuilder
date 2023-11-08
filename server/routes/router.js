const express = require("express");
const router = express.Router();
const { createForm, getForm } = require('../controllers/formController')
const multer = require('multer');
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const absolutePath = path.join(__dirname, '../uploads');
    cb(null, absolutePath);
  },
  filename: (req, file, cb) => {
    const imagePath = path.join(__dirname, '../uploads', 'headerimg.jpg');
    fs.unlink( imagePath, (error) => {
      if (error) {
        console.log("Error image file:", error);
      }
    });
    cb(null, 'headerimg.jpg');
  },
});
const upload = multer({storage})

router.post('/form', upload.single('image'), createForm);
router.get('/form', getForm);

module.exports = router