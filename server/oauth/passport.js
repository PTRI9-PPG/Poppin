// const passport = require('passport');
// // const GoogleUser = require('../models/UserModel');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const GitHubStrategy = require('passport-github2').Strategy;

// const pool = require('../db')

// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:3005/auth/google/callback",
//     // scope: ['email', 'profile'],
//   }, async (accessToken, refreshToken, profile, done) => {
//     const acct = profile._json;
//     console.log('acct-->',acct);
//     try{
//         await pool.query("SELECT * FROM GoogleUser WHERE google_id=$1", [account.sub]);
//     } catch(error){
//         done(err)
//     }
//     // const sql = "INSERT INTO GoogleUser (google_id, name) VALUES (?, ?, ?)";
//     // console.log('sql--->',sql);
//     // const values = [profile.id, profile.displayName];
//     // connection.query(sql, values, function (err, result) {
//     //     if (err) throw err;
//     //     console.log("User information inserted into the database");
//     //  }).save().then(())
//     // return done(null, profile);
//   }
// ));

// passport.use(new GitHubStrategy({
//     clientID: process.env.GITHUB_CLIENT_ID,
//     clientSecret: process.env.GITHUB_CLIENT_SECRET,
//     callbackURL: "/auth/github/callback"
//   },
//   function(accessToken, refreshToken, profile, done) {
//     User.findOrCreate({ githubId: profile.id }, function (err, user) {
//       return done(err, user);
//     });
//   }
// ));

// passport.serializeUser((user,done) => {
//     done(null, user)
// });

// passport.deserializeUser((user,done) => {
//     done(null, user)
// });

// module.export = passport;