const router = require("express").Router();
const passport = require("passport");

const CLIENT_URL = "http://localhost:8080/#/home"

router.get("/login", (req, res) => {
    if (req.user) {
      res.status(200).json({
        success: true,
        message: "successfull",
        user: req.user,
      });
    }
});
  
router.get("/login/failed", (req, res) => {
    res.status(401).json({
      success: false,
      message: "failure",
    });
});
  
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("http://localhost:8080/");
});

//google router
router.get('/google', 
  passport.authenticate("google", 
    { 
        scope: ["profile", "email"]
    }
));

router.get("/google/callback", 
  passport.authenticate("google",
    {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
    }
));

//github router
router.get('/github', 
  passport.authenticate("github", 
    { 
        scope: ["profile", "email"]
    }
));

router.get("/github/callback", 
  passport.authenticate("github",
    {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
    }
));

module.exports = router;