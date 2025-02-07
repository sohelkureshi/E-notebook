const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const jwt_secret = process.env.JWT_SECRET;

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name', 'Provide a valid name').trim().isLength({ min: 2 }),
    body('email', 'Provide a valid email').isEmail().normalizeEmail(),
    body('password', 'Password length must be at least 5 characters').isLength({ min: 3 })
], async (req, res) => {
    let success = false;

    // Validate user inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            success,
            errors: errors.array().map(err => err.msg) // Send only messages
        });
    }

    try {
        // Check if user already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "Sorry, a user with this email already exists" });
        }

        // Create secured password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Create new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });

        // Generate JWT token
        const payload = {
            user: { id: user.id }
        };
        const authToken = jwt.sign(payload, jwt_secret, { expiresIn: '1h' });

        success = true;
        res.json({ success, authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ 
            error: "Internal server error",
            details: error.message 
        });
    }
});

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Provide a valid email').isEmail().normalizeEmail(),
    body('password', 'Password field cannot be blank').notEmpty()
], async (req, res) => {
    let success = false;

    // Validate user inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success, error: "Invalid credentials" });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ success, error: "Invalid credentials" });
        }

        // Generate JWT token
        const payload = {
            user: { id: user.id }
        };
        const authToken = jwt.sign(payload, jwt_secret, { expiresIn: '1h' });

        success = true;
        res.json({ success, authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

// ROUTE 3: Get logged-in user details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
