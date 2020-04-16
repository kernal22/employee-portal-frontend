const Passport = require('passport');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;
const config = require('../config/config');
const EmployeeBizClass = require('../model/employee.model');

module.exports = configJWTStrategy = async () => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret,
  };

  Passport.use(
    new JwtStrategy(opts, async (paylod, done) => {
        const empModel = new EmployeeBizClass();
        let data = await empModel.getEmployee(paylod.id);
        if(data) {
          Passport.serializeUser(function(user, done) {
            done(null, user);
          });
        } else {
            return done(null, false);
        }
    })
  );
};