const passport = require('passport'); 
const pool = require('../db'); 
const GoogleStrategy = require('passport-google-oauth20').Strategy; 

const GOOGLE_CLIENT_ID = "417484238621-m4uh1dnnn8iahutep5rugn1j6rtrgdov.apps.googleusercontent.com"; 
const GOOGLE_CLIENT_SECRET = "nHjNUhshc4ivzLptmXh6kQli"; 

let initPassport = () => {
    passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID, 
        clientSecret: GOOGLE_CLIENT_SECRET, 
        // after they get logged in to Google 
        callbackURL: "http://localhost:8080/auth/google/callback"
      }, 
      // callback function 
      function(accessToken, refreshToken, profile, done) {
        // use profile info (mainly profile id) to check if user is registered in the db 
        console.log(profile)
        console.log("REFRESH TOKEN", refreshToken); 
        console.log("ACCESS TOKEN", accessToken); 
        pool.query(`SELECT * FROM users WHERE google_id=($1)`, [profile.id], (err, res) => {
          if (err) return next(err); 
          console.log(res.rows); 
          console.log(profile.emails[0].value)
          console.log(profile); 
         if (res.rows.length != 0) {
             user = res.rows[0]; 
             console.log("USER!!!!",user); 
             return done(null, user); 
          } else {
            // NEW USER 
             pool.query('INSERT INTO users(google_id, name, email) VALUES ($1, $2, $3)', [profile.id, profile.name.givenName + " " + profile.name.familyName, profile.emails[0].value], (error, response) => {
               if (error) return next(error); 
               console.log("INSERTED NEW USER!!!")
               return done(null, {googleId: profile.id, name: profile.name.given + " " + profile.name.familyName, email : profile.emails[0].value}); 
             })
          }
       })
        
      }
      ))
}

passport.serializeUser(function(user, done) {
    console.log("USER SERIALIZE", user)
    done(null, user.google_id); 
  })
  
  passport.deserializeUser(function(id, done) {
    console.log("ID!!!!", id); 
    pool.query(`SELECT * FROM users WHERE google_id=($1)`, [id], (err, res) => {
      if (err) return next(err); 
      
     if (res.rows.length != 0) {
        user = res.rows[0]; 
        console.log(user); 
        console.log("ENTERED IF DESERIALIZE"); 
        done(null, user); 
      } else done(null, false); 
   })
})

module.exports = initPassport; 