const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const auth = require('../middleware/auth');

// Register User
router.post("/register", async (req, res) => {
    try {

        // Store email & username from body
        let { displayName, email } = req.body;

        // Form validation
        if(!displayName) return res.status(400).json({ msg: 'Username required' })

        // Make email undefined if empty
        if(!email) email = undefined;


        // Define new user from model
        const newUser = new User ({
            displayName,
            email
        })

        // Generate JWT Token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

        // Save user in DB
        const savedUser = await newUser.save();

        return res.json({
            token,
            savedUser
        })

    } catch(err) {
        return res.status(500).json({ error: err.message })
    }
})

// Check If User Is Logged In
router.post("/tokenIsValid", async (req, res) => {
    try {

        // Verify user via token
        const token = req.header("x-auth-token");
        if(!token) return res.json(false);

        // Verify JWT
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified) return res.json(false);

        // Verify user from DB
        const user = await User.findById(verified.id);
        if(!user) return res.json(false);

        // User passes all validity checks
        return res.json(true);

    } catch(err) {
        return res.status(500).json({ error: err.message })
    }
})

// Retrieve Current User
router.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user)
    res.json({
        displayName: user.displayName,
        id: user._id
    })
})

module.exports = router;
