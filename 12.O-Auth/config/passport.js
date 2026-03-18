import passport from "passport";

import googlepassport from "passport-google-oauth20";
import { Profiler } from "react";

const GoogleAuthStrategy = GoogleStrategy.Strategy;

passport.use(
  new GoogleAuthStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://www.example.com/auth/google/callback"
    },

    async (Profiler, done) => {},
    ),
)

export default passport;
