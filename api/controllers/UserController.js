/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  view: (req, res) => {

    sails.log.info('[User.view] : requesting User ', JSON.stringify(req.user));

    // if(!req.body){
    //   res.badRequest();
    //   res.end();
    //   return;
    // }

    data = {
      uid: req.user.uid,
    }

    User.findOne(data, function (err, user) {

      if (err) return res.basRequest(err);

      sails.log.info('User ' + user.id + ' is being viewed');

      return res.ok({
        user: user
      });

    });

  },

  testing: function(req,res){
    req.logout();
    res.ok({message:'ok'});
  }

};
