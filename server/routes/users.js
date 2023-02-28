const express = require('express');
const router = express.Router();

const jwtUtil = require('../lib/jwtUtil');
const jwtAuthentication = require('../middlewares/jwtAuth');
const User = require('../models/User');

// GET /api/users/token
router.get('/token', (req, res) => {
    const token = { token: req.cookies.token };
    res.status(200).json(token);
});

// POST /api/users/login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            res.status(401).json({ error: { message: `User "${req.body.username}" does not exist.` }});
            return;
        }

        if (!await user.validatePassword(req.body.password)) {
            res.status(401).json({ error: { message: 'Incorrect password.' }});
            return;
        }

        const token = jwtUtil.createToken(
            { userId: user._id }, 
            { expiresIn: '1d' }
        );

        res
            .cookie('token', token, { httpOnly: true, maxAge: 86400000 })
            .json({ token });
            
    } catch (err) {
        res.status(400).json({ error: { message: err.message }});
    }
});

// POST /api/users/register
router.post('/register', async (req, res) => {
    // The password is hashed with the argon2 hashing algorithm
    // before it is stored in the database. See the User schema.

    try {
        const userExists = await User.findOne({ username: req.body.username });

        if (userExists) {
            res.status(400).json({ error: { message: `User "${userExists.username}" already exists.` }});
            return;
        }

        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: req.body.password
        });

        await user.save();
        res.status(201).json({ id: user._id });
    } catch (err) {
        res.status(400).json({ error: { message: err.message }});
    }
});

// POST /api/users/logout
router.post('/logout', jwtAuthentication(), (req, res) => {
    res.clearCookie('token').send();
})

module.exports = router;