const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user.model")
const asyncHandler = require("express-async-handler");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    asyncHandler(async (accessToken, refreshToken, profile, done) => {
      const userData = profile._json;

      const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
            return done(null, existingUser);
        }

        const newUser = new User({
            googleId: userData.sub,
            name: userData.name,
            email: userData.email,
            photo: userData.picture,
        })

        await newUser.save();
        return done(null, newUser);
    })
  )
);
