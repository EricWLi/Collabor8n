const mongoose = require('mongoose');
const { Schema } = mongoose;

const CanvasSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    collaborators: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    allowGuests: { type: Boolean, default: false },
    objects: [{
            color: String,
            width: Number,
            points: [{
                x: Number,
                y: Number
            }],
            count: Number
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Canvas', CanvasSchema);