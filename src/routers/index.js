const express = require('express');
const router = express.Router();

const imageController = require('../controllers/imageController');

router.get('/', imageController.generateSignedUrl);

module.exports = router;