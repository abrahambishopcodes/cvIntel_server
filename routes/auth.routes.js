const express = require("express");
const AuthRouter = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken")

AuthRouter.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}))

AuthRouter.get("/google/redirect", passport.authenticate("google", {
    session: false,
}), (req, res) => {

    const payload = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        photo: req.user.photo
    }

    const token = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {expiresIn: "1d"})
    res.status(200).json({
        message: "User authenticated successfully",
        user: req.user,
        token: token  
    })
    
})

module.exports = AuthRouter;

