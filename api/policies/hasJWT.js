/**
 * hasJWT
 * @description :: Policy to inject user in req via JSON Web Token
 */
var passport = require('passport');

module.exports = function (req, res, next) {
  // sails.log.info('incoming jwt, lets test passport : \n', JSON.parse(req.headers.authorization));
  passport.authenticate('jwt', function (error, user, info) {
    // sails.log.info('passport jwt auth - user: ', user);
    // sails.log.info('passport jwt error : ', error);
    // sails.log.info('passport jwt info : ', info.username + ': \n' + info.message);
    if (error) return res.serverError(error);
    if (!user)
      return res.unauthorized(null, info && info.code, info);
    req.user = user;

    next();
  })(req, res);

  // passport.authenticate('jwt',{session:false},req)(req,res);
};
