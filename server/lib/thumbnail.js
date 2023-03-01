const CanvasModel = require('../models/Canvas');
const { createCanvas } = require('canvas');

const THUMBNAIL_UPDATE_INTERVAL = 60000; // 1 minute
const THUMBNAIL_WIDTH = 384;
const THUMBNAIL_HEIGHT = 216;

function getDimensions(paths) {
    let width = 0;
    let height = 0;

    paths.forEach(path => {
        path.points.forEach(point => {
            width = Math.max(width, point.x);
            height = Math.max(height, point.y);
        });
    });

    return { width, height };
}

function draw(ctx, path) {
    if (!path || !path.points) {
        return;
    }

    const first = path.points[0];

    ctx.beginPath();
    ctx.moveTo(first.x, first.y);

    // Canvas does not allow single point line; extend by one pixel
    if (path.points.length < 2) {
        ctx.lineTo(first.x, first.y + 1);
    }

    for (let i = 1; i < path.points.length; i++) {
        ctx.lineTo(path.points[i].x, path.points[i].y);
    }

    ctx.strokeStyle = path.color;
    ctx.lineWidth = path.width;
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke();
}

async function shouldUpdateThumbnail(canvasId) {
    const timestampQuery = await CanvasModel.findById(canvasId, 'thumbnailTs');

    const diff = Date.now() - timestampQuery.thumbnailTs;
    return diff >= THUMBNAIL_UPDATE_INTERVAL;
}

async function generateThumbnail(id) {
    const canvasQuery = await CanvasModel.findById(id);

    if (!canvasQuery) {
        return null;
    }

    // Get all paths from database and calculate dimensions
    const paths = canvasQuery.objects;
    let dimensions = getDimensions(paths);

    // Add padding to the sides
    dimensions.width += dimensions.width * 0.1;
    dimensions.height += dimensions.height * 0.1;

    // Draw paths onto canvas
    const canvas = createCanvas(dimensions.width, dimensions.height);
    const canvasCtx = canvas.getContext('2d');
    paths.forEach(path => draw(canvasCtx, path));

    // Create thumbnail buffer
    const thumbnail = createCanvas(THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT);
    const thumbnailCtx = thumbnail.getContext('2d');
    thumbnailCtx.drawImage(canvas, 0, 0, THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT);
    
    return thumbnail.toBuffer("image/png");
}

module.exports = { shouldUpdateThumbnail, generateThumbnail };