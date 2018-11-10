const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  User.findOne({
    id
  }, function (err, user) {
    cb(err, user);
  });
});

/**
 * Configuration object for local strategy
 */
var LOCAL_STRATEGY_CONFIG = {
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
};

passport.use(new LocalStrategy(LOCAL_STRATEGY_CONFIG,
  (req, username, password, cb) => {
    // sails.log.info('local auth : ', req.isAuthenticated());
    // sails.log.info('local user : ', username);
    // sails.log.info('local pass : ', password);

    User.findOne({
      username: username
    }, function (err, user) {
      if (err) return cb(err);
      if (!user) return cb(null, false, {
        message: 'Username not found'
      });
      bcrypt.compare(password, user.password, function (err, res) {
        if (!res) return cb(null, false, {
          message: 'Invalid Password'
        });
        sails.log.info('User Login Successful uid: ', user.uid);
        return cb(null, user, {
          message: 'Login Successful'
        });
      });
    });
  }));


var EXPIRES_IN_MINUTES = 60 * 24;
var SECRET = process.env.tokenSecret || "n8Mc0uIVnB3iI1yxj646fVXSE3ZVk4doZgz6fTbNg7jO41EAtl20J5F7Trtwe7OM";
var ALGORITHM = "HS256";
var ISSUER = "localhost:1337";
var AUDIENCE = "localhost:1337";



/**
 * Configuration object for JWT strategy
 */
var JWT_STRATEGY_CONFIG = {
  secretOrKey: SECRET,
  issuer: ISSUER,
  audience: AUDIENCE,
  passReqToCallback: false
};

/**
 * Triggers when user authenticates via local strategy
 */
// function _onLocalStrategyAuth(email, password, next) {
//   User.findOne({email: email})
//     .exec(function (error, user) {
//       if (error) return next(error, false, {});

//       if (!user) return next(null, false, {
//         code: 'E_USER_NOT_FOUND',
//         message: email + ' is not found'
//       });

//       // TODO: replace with new cipher service type
//       if (!CipherService.comparePassword(password, user))
//         return next(null, false, {
//           code: 'E_WRONG_PASSWORD',
//           message: 'Password is wrong'
//         });

//       return next(null, user, {});
//     });
// }

/**
 * Triggers when user authenticates via JWT strategy
 */
function _onJwtStrategyAuth(payload, next) {
  var user = payload.user;
  return next(null, user, {
    message: 'successful token auth'
  });
}

// const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET;
// opts.issuer = ISSUER;
// opts.audience = AUDIENCE;
// opts.algorithms = [ALGORITHM];
opts.jwtFromRequest = (req) => {
  let token = JSON.parse(req.headers.authorization || null);
  // console.log(jwt.verify(token,SECRET));
  // sails.log.info('passport getting jwt form req : \n', token);
  return  token || null;
}
opts.passReqToCallback = false;

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {

  // sails.log.debug('passport JWT use :', jwt_payload);

  User.findOne({
    id: jwt_payload.id
  }, function (err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
      // or you could create a new account
    }
  });
}));

// passport.use(
//   new LocalStrategy(LOCAL_STRATEGY_CONFIG, _onLocalStrategyAuth));
// passport.use(
//   new JwtStrategy(JWT_STRATEGY_CONFIG, (user,password,cb)=>{
//     var user = payload.user;
//     return cb(null, user,  {message:'successful token auth'});
//   }));

module.exports.jwtSettings = {
  // expiresInMinutes: EXPIRES_IN_MINUTES,
  secret: SECRET,
  algorithm: ALGORITHM,
  issuer: ISSUER,
  audience: AUDIENCE
};
