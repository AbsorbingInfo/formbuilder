const express = require("express");
const router = express.Router();
const { createForm, getForm } = require('../controllers/formController')
const multer = require('multer');
const path = require('path')
const fs = require('fs')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/form', upload.single('image'), createForm);
router.get('/form', getForm);

module.exports = router