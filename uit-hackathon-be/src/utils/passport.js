const passport = require("passport");
const User = require("../models/User");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const logger = require("./logger");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const strategy = new JwtStrategy(options, async (jwtPayload, done) => {
  try {
    const user = await User.findOne({ email: jwtPayload.email });
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (err) {
    logger.error(err, { label: "Authentication" });
    done(err, false);
  }
});

passport.use(strategy);

module.exports = passport;
