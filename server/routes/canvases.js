const express = require('express');
const router = express.Router();
const jwtAuthentication = require('../middlewares/jwtAuth');

const Canvas = require('../models/Canvas');

// GET /api/canvases
router.get('/', jwtAuthentication(), async (req, res) => {
    let query;

    const ownerQuery = { owner: req.jwt.userId };
    const sharedQuery = { collaborators: req.jwt.userId };

    if (req.query.filter === 'owner') {
        query = ownerQuery;
    } else if (req.query.filter === 'shared') {
        query = sharedQuery;
    } else {
        query = { 
            $or: [ 
                ownerQuery,
                sharedQuery
            ]
        };
    }

    const canvases = await Canvas.find(query);

    res.status(200).json(canvases);
});

// GET /api/canvases/{canvasId}
router.get('/:canvasId', jwtAuthentication({ allowGuests: true }), async (req, res) => {
    const canvas = await Canvas.findOne({
        _id: req.params.canvasId,
        $or: [ { owner: req.jwt?.userId }, { collaborators: req.jwt?.userId }, { allowGuests: true } ]
    });

    res.json(canvas);
});

router.post('/', jwtAuthentication({ allowGuests: true }), async (req, res) => {
    const canvas = new Canvas({
        owner: req.jwt?.userId,
        allowGuests: (req.jwt === undefined),
    });

    await canvas.save();
    res.status(201).json(canvas);
})

module.exports = router;