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

  detail: (req, res) => {

    data = {
      uid: req.params.uid,
    }

    User.findOne(data)
      .populate('groups')
      .populate('events')
      .exec((err, user) => {
        if (err) {
          sails.log.info('[UserDetail Error] : ', JSON.stringify(err));
          return res.badRequest(err);
        }

        return res.ok(user);
      });
  },

  edit: (req, res) => {
    var data = req.body;
    if (!data || !data.username || !data.uid) {
      return res.badRequest(err);
    }

    newUser = {
      username: data.username
    };

    if(data.password && data.password === data.confirmPassword){
      sails.log.info('[UserUpdate Info] : ', JSON.stringify(data));
      // newUser['password'] = data.password;
    }

    User.update({
        uid: req.body.uid
      }, newUser)
      .fetch()
      .exec((err, user) => {
        if (err) {
          sails.log.info('[UserUpdate Error] : ', JSON.stringify(err));
          return res.badRequest(err);
        }
        return res.ok(user);
      });
  },

  groups: (req, res) => {
    data = {
      uid: req.params.uid,
    }

    User.findOne(data)
      .populate('groups')
      .exec((err, user) => {
        if (err) {
          sails.log.info('[UserGroups Error] : ', JSON.stringify(err));
          return res.badRequest(err);
        }

        return res.ok(user.groups);
      });
  },

  events: function (req, res) {
    data = {
      uid: req.params.uid,
    }

    User.findOne(data)
      .populate('events')
      .exec((err, user) => {
        if (err) {
          sails.log.info('[UserEventss Error] : ', JSON.stringify(err));
          return res.badRequest(err);
        }

        return res.ok(user.events);
      });
  }

};
