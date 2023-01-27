const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const AuthUser = require('../models/authModel');

// Google Passport
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
  }, async (accessToken, refreshToken, profile, done) => {
    // passport callback function
    console.log(profile)
    new AuthUser({
        username: profile.displayName,
        googleID: profile.id,
    });
  }
));

// Github Passport
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    done(null, profile)
  }
));

passport.serializeUser((user,done) => {
    done(null, user)
});

passport.deserializeUser((user,done) => {
    done(null, user)
});

module.export = passport;