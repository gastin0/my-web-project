const express = require("express");
const authMiddleware = require("../middleware/auth.js");

const router = express.Router();


router.get("/profile", authMiddleware, (req, res) => {
    res.json({
        message: "Welcome to profile page!",
        user: req.user,
    });
});

module.exports = router;