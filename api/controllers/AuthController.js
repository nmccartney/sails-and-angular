const passport = require('passport');


/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  //Login function
  login: function (req, res) {
    passport
      .authenticate('local', _onPassportAuth.bind(this, req, res))(req, res);
  },
  //Logout function
  logout: function (req, res) {
    req.logout();
    res.ok({logout:true});
  },
  //Register function
  register: function (req, res) {
    //TODO: form validation here
    data = {
      username: req.body.username,
      password: req.body.password
    };

    User.create(data).fetch().exec(function (err, user) {
      if (err) {
        sails.log.info('[UserCreate Error] : ', JSON.stringify(err));
        return res.badRequest(err);
      }

      //TODO: Maybe send confirmation email to the user before login
      req.login(user, function (err) {
        if (err) return res.negotiate(err);
        sails.log.info('User ' + user.id + ' has logged in.');
        // return res.redirect('/');
        return res.ok({
          // TODO: replace with new type of cipher service
          token: CipherService.createToken(user),
          user: user
        });
      })
    })
  },

  checkIn:function(req,res){
    res.ok({checkIn:true});
  },

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
function _onPassportAuth(req, res, error, user, info) {

  if (error) return res.serverError(error);
  if (!user) return res.unauthorized(null, info && info.code, info && info.message);

  user = _.omit(user,['password']);

  let token = CipherService.createToken(user);

  req.login(user, function (err) {
    // sails.log.info('auth.login user - ', user);
    // sails.log.info('auth.login auth ? ', req.isAuthenticated());
    // sails.log.info('auth.login out going token : ', token);

    if ((err) || (!user)) return res.send({
      message: info.message,
      user
    });

    return res.ok({
      // TODO: replace with new type of cipher service
      token: token,
      user: user
    });
  });

}
