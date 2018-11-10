var passport = require('passport');

// We use passport to determine if we're authenticated
module.exports = function (req, res, next) {

  'use strict';

  // Sockets
  if (req.isSocket) {
    if (req.session &&
      req.session.passport &&
      req.session.passport.user) {
      return next();
    }

    res.json(401);
  }
  // HTTP
  else {
    // sails.log.info('http auth? req: ', req.isAuthenticated())
    // sails.log.info('http req session: ', req.session);
    // sails.log.info('http req user: ', req.user || null);

    // passport
    //   .authenticate('local', _onPassportAuth2.bind(this, req, res))(req, res);

    if (req.isAuthenticated()) {
      return next();
    }

    // // If you are using a single-page client-side architecture and will login via socket or Ajax, then uncomment out this code:
    res.status(401);
    res.forbidden();
    res.end();

  }

};


/**
 * Triggers when user authenticates via passport
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Object} error Error object
 * @param {Object} user User profile
 * @param {Object} info Info if some error occurs
 * @private
 */
function _onPassportAuth2(req, res, error, user, info) {
  // sails.log.info('authenticate req - ', req);
  sails.log.info('authenticate req:sess - ', req.sessionStore.sessions);
  sails.log.info('authenticate req:user - ', req.user);
  sails.log.info('authenticate info - ', info);
  sails.log.info('authenticate user - ', user);
  if (error) return res.serverError(error);
  if (!user) return res.unauthorized(null, info && info.code, info && info.message);

  req.login(user, function (err) {
    sails.log.info('authenticate user - ', user.username);
    sails.log.info('authenticate pass - ', user.password);
    sails.log.info('authenticate auth ? ', req.isAuthenticated());
    // sails.log.info('authenticate token : ', token);
    if (err) res.send(err);

    if ((err) || (!user)) return res.send({
      message: info.message,
      user
    });

    return next();
  });

}
