const express = require('express');
const router = express.Router();

const Canvas = require('../models/Canvas');

router.get('/thumbnail/:id', async (req, res) => {
    const canvas = await Canvas.findById(req.params.id)
        .select('thumbnail');

    if (!canvas) {
        return res.status(404).json({ error: { message: 'This canvas does not exist.' }});
    }

    if (!canvas.thumbnail) {
        return res.status(404).json({ error: { message: 'This canvas does not have a thumbnail.' }});
    }

    res.contentType('image/png');
    res.send(canvas.thumbnail);
});

module.exports = router;