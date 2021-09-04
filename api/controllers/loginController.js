
let getPageLogin = (req, res) => {
    return res.render("<h1>Login Page? </h1> "); 
}

let checkLoggedIn = (req, res, next) => {
    // if LOGGED OUT, direct user to log in
    // if LOGGED IN, run the callback function 
    if (!req.isAuthenticated()) {
        return res.redirect('/auth/login'); 
    }
    next(); 
}

let checkLoggedOut = (req, res, next) => {
    // if LOGGED IN, direct user to logged in page
    // else, direct user to login w/ the callback 
    if (req.isAuthenticated()) {
        return res.redirect("/"); 
    }
    next(); 
}

module.exports = {
    getPageLogin: getPageLogin,
    checkLoggedIn: checkLoggedIn,
    checkLoggedOut: checkLoggedOut,
};
