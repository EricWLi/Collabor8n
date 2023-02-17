const mongoose = require('mongoose');
const argon2 = require('argon2');

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const hash = await argon2.hash(this.password);
        this.password = hash;
        next();
    } catch (err) {
        next(err);
    }
});

UserSchema.methods.validatePassword = async function(password) {
    if (!password) {
        return false;
    }

    try {
        return await argon2.verify(this.password, password);
    } catch {
        return false;
    }
}

module.exports = mongoose.model('User', UserSchema);