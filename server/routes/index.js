const express = require('express');
const router = express.Router();

router.use('/api/users', require('./users'));
router.use('/api/documents', require('./documents'));
router.use('/api/rooms', require('./rooms'));
router.use('/api/chat', require('./chat'));

module.exports = router;