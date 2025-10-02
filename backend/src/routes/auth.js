const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password)
            return res.status(400).json({ message: "All fields required!" });

        const existing = await User.findOne({ email });
        if (existing)
            return res.status(400).json({ message: "Email already used!" });

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashed });

        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
    
        if (!email || !password)
            return res.status(400).json({ message: "email and password required!"});
    
        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ message: "Email not found, please sign up"});
    
        const valid = await bcrypt.compare(password, user.password);
        if (!valid)
            return res.status(400).json({ message: "Invalid credentials!" });
    
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d"}
        );
    
        res.json({ message: "Login successful!", token });
    } catch (err) {
        res.status(500).json({ message: `Error: ${err}`});
    }     
});


module.exports = router;
