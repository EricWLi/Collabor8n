const express = require('express');
const router = express.Router();

router.use('/api/users', require('./users'));
router.use('/api/canvases', require('./canvases'));

module.exports = router;