
const express = require('express');
const router = express.Router();

const upload = require("../libs/multer")
const { analyzeResumeWithJd } = require("../controllers/resume.controller")


router.post('/upload', upload.single('resume'), analyzeResumeWithJd);


module.exports = router;