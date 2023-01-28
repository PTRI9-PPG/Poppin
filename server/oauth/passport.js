const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const passport = require('passport');
const AuthUser = require('../models/authModel');

// Serialize persists user.id into session
passport.serializeUser((user,done) => {
    console.log('userid--->',user.id)
    done(null, user.id)
 });
 
 
 // Deserialize will retrieve user data from session
passport.deserializeUser((id, done) => {
    // console.log({id})
   
    AuthUser.findById(id).then((user) => {
        console.log('user--->',user)
        done(null, user);
    })
 }); 

// Google Passport
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
  }, async (accessToken, refreshToken, profile, done) => {
    // passport callback function
    // console.log('profile--->',profile)
    
    // check if user already exists in our db so there's no duplicates
   AuthUser.findOne({googleID: profile.id}).then((currUser) => {
    if(currUser){
        //already have the user
        // console.log('User is: ', currUser);
        //once we have an exisitng user, we will serialize it
        done(null, currUser)
    }else{
        //if not, create user in our db
        new AuthUser({
            username: profile.displayName,
            googleID: profile.id,
        })
        .save()
        .then((newAuthUser) => newAuthUser.json())
        .then(newAuthUser =>{
            console.log('New user created: ' + newAuthUser);
            //once we create a user, we will serialize it
            done(null, newAuthUser);
        });
    }
    });
    }
));


module.exports = passport;

 