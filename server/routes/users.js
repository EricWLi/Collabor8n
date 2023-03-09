const express = require('express');
const router = express.Router();

const jwtUtil = require('../lib/jwtUtil');
const jwtAuthentication = require('../middlewares/jwtAuth');
const User = require('../models/User');

function createToken(user) {
    return jwtUtil.createToken(
        {
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username
        },
        {
            expiresIn: '1d'
        }
    );
}

// GET /api/users/token
router.get('/token', (req, res) => {
    const token = req.cookies.token;

    try {
        jwtUtil.validateToken(token);
        res.status(200).json({ token });
    } catch {
        res.status(401).json({ error: { message: 'Invalid token.' } });
    }
});

// POST /api/users/login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
            .collation({ locale: 'en', strength: 2 });

        if (!user) {
            res.status(401).json({ error: { message: `User "${req.body.username}" does not exist.` }});
            return;
        }

        if (!await user.validatePassword(req.body.password)) {
            res.status(401).json({ error: { message: 'Incorrect password.' }});
            return;
        }

        const token = createToken(user);

        res
            .status(200)
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
        const userExists = await User.findOne({ username: req.body.username })
            .collation({ locale: 'en', strength: 2 });

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
        
        const token = createToken(user);

        res
            .status(201)
            .cookie('token', token, { httpOnly: true, maxAge: 86400000 })
            .json({ token });
    } catch (err) {
        res.status(400).json({ error: { message: err.message }});
    }
});

// POST /api/users/logout
router.post('/logout', (req, res) => {
    res.clearCookie('token').send();
})

// GET /api/users/search
router.get('/search', async (req, res) => {
    const query = req.query.q || req.query.query

    if (!query) {
        return res.json([]);
    }

    const results = await User
        .find({ username: { $regex: '^' + query, $options: 'i'} })
        .select('username firstName lastName')
        .limit(10);

    res.json(results);
});

module.exports = router;