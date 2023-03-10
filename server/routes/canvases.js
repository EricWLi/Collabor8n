const express = require('express');
const router = express.Router();
const jwtAuthentication = require('../middlewares/jwtAuth');

const Canvas = require('../models/Canvas');
const { generateThumbnail } = require('../lib/thumbnail');

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

    const canvases = await Canvas
        .find(query)
        .select('-objects')
        .populate('owner', 'username firstName lastName')
        .populate('collaborators', 'username firstName lastName');;

    res.status(200).json(canvases);
});

// GET /api/canvases/{canvasId}
router.get('/:canvasId', jwtAuthentication({ allowGuests: true }), async (req, res) => {
    const canvas = await Canvas
        .findById(req.params.canvasId)
        .populate('owner', 'username firstName lastName')
        .populate('collaborators', 'username firstName lastName');

    if (!canvas) {
        return res.status(404).json({ error: { message: 'This canvas does not exist.' }});
    } else if (!canvas.allowGuests) {
        if (req.jwt) {
            // User is logged in.
            // Return HTTP 403 Forbidden if the user does not have access to the resource.

            const containsUserId = (objId) => objId?.equals(req.jwt.userId);

            if (
                !containsUserId(canvas.owner) &&
                !canvas.collaborators.some(containsUserId)
            ) {
                return res.status(403).json({ error: { message: 'You do not have access to this canvas. Please request permissions from the owner of this canvas.' }});
            }

        } else {
            // User is not logged in, and the canvas is not public.
            // Return HTTP 401, redirect user to login.
            return res.status(401).json({ error: { message: 'The requested canvas is not public.' }});
        }
    }

    res.json(canvas);
});

// PUT /api/canvases/{canvasId}
router.put('/:canvasId', jwtAuthentication(), async (req, res) => {
    const canvas = await Canvas
        .findById(req.params.canvasId)
        .select('-objects');

    if (!canvas) {
        return res.status(404).json({ error: { message: 'This canvas does not exist.' } });
    }

    if (canvas.owner.equals(req.jwt.userId)) {
        if (req.body.allowGuests !== undefined) {
            canvas.allowGuests = req.body.allowGuests;
        }

        if (req.body.collaborators) {
            canvas.collaborators = req.body.collaborators;
        }

        await canvas.save();
        return res.status(200).json(canvas);
    } else {
        return res.status(403).json({ error: { message: 'You do not have permission to edit this canvas.' } });
    }
});

// DELETE /api/canvases/{canvasId}
router.delete('/:canvasId', jwtAuthentication(), async (req, res) => {
    const canvas = await Canvas.findById(req.params.canvasId);

    if (!canvas) {
        return res.status(404).json({ error: { message: 'This canvas does not exist.' } });
    }

    if (canvas.owner.equals(req.jwt.userId)) {
        await canvas.delete();
        return res.status(200).json({ message: 'Canvas deleted.' });
    } else {
        return res.status(403).json({ error: { message: 'You do not have permission to delete this canvas.' } });
    }
});

// POST /api/canvases
router.post('/', jwtAuthentication({ allowGuests: true }), async (req, res) => {
    const canvas = new Canvas({
        owner: req.jwt?.userId,
        allowGuests: (req.jwt === undefined),
    });

    await canvas.save();

    const thumbnail = await generateThumbnail(canvas._id);
    canvas.thumbnail = thumbnail;
    await canvas.save();

    res.status(201).json(canvas);
})

module.exports = router;