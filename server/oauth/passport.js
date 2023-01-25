const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3005/auth/google/callback",
    scope: ['email', 'profile'],
  },
  function(accessToken, refreshToken, profile, done) {
    // const sql = "INSERT INTO users (google_id, name, email) VALUES (?, ?, ?)";
    // const values = [profile.id, profile.displayName, profile.emails[0].value];
    // connection.query(sql, values, function (err, result) {
    //     if (err) throw err;
    //     console.log("User information inserted into the database");
    //  });
    // return cb(null, profile);
    done(null, profile)
  }
));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

passport.serializeUser((user,done) => {
    done(null, user)
});

passport.deserializeUser((user,done) => {
    done(null, user)
});

module.export = passport;