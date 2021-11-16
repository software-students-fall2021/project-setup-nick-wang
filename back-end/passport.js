var passport = require('passport');
var JWTStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

// JWT Strategy
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      try {
        // Find the user specified in token
        const user = await User.findById(payload.sub);
        // If does not exits
        if (!user) {
          return done(null, false);
        }
        // Otherwise, return the user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

// Local Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
    },
    async (username, password, done) => {
      try {
        // Find the user
        const user = await User.findOne({ username });

        // If not, handle it
        if (!user) {
          return done(null, false);
        }

        // Check if the password is correct
        const isMatch = await user.isValidPassword(password);
        // If not, handle it
        if (!isMatch) {
          return done(null, false);
        }
        // Otherwise, return the user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
