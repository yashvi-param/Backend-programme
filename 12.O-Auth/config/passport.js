import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import passport from "passport";
import passportGoogle from "passport-google-oauth20";

import User from "../model/User.js";

const googleAuthStrategy = passportGoogle.Strategy;

passport.use(
  new googleAuthStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, cb) => {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
          });
        }

        return cb(null, user);
      
      }
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;