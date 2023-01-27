const router = require('express').Router();
const passport = require('passport');

const CLIENT_URL = "http://localhost:8080/#/home";

// Login and Logout Router
router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "Not able to login!",
    })
});

router.get("/login/success", (req, res) => {
    if(req.user){
        res.status(200).json({
            success: true,
            message: "Successful login!",
            user: req.user,
        });
    }
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("http://localhost:8080/");
});

// Google Router - auth with google (when you click to sign in)
router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile']
    })
);

// callback route for google to redirect to 
router.get(
    "/google/callback", 
    passport.authenticate("google", 
    {
        successRedirect: CLIENT_URL,
        failureRedirect: "/login/failed",    
    }
));

// Github Router
router.get(
    '/auth/github', 
    passport.authenticate('github', {
        scope: ['email', 'profile']
    })
);

router.get(
    "/github/callback", 
    passport.authenticate("github", 
    {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",    
    }
));

module.exports = router;
