/**
 * AppInviteController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  index: (req, res) => {
    AppInvite.find().exec((err, invites) => {
      if (err) {
        sails.log.info('[AppInvite.Index Error] : ', JSON.stringify(err));
        return res.badRequest(err);
      }

      return res.ok(invites);
    });
  },

  create: (req, res) => {

    if (!req.body && !req.body.owner && !req.body.invited) {
      return res.badRequest(err);
    }

    newData = {
      invited: req.body.invited,
      owner: req.body.owner
    };

    AppInvite.create(newData).fetch().exec((err, event) => {
      if (err) {
        sails.log.info('[AppInvite.create Error] : ', JSON.stringify(err));
        return res.badRequest(err);
      }

      return res.ok(event);
    });
  },

  occupy: (req, res) =>{
    if (!req.body && !req.body.uid && !req.body.invited) {
      return res.badRequest(err);
    }

    var newUser = {
      invited: req.body.invited
    };

    AppInvite.update({
      uid: req.body.uid
    }, newUser).fetch()
    .exec((err, invite) => {
      if (err || invite.length == 0) {
        sails.log.info('[AppInvite.occupy Error] : ', JSON.stringify(err));
        return res.badRequest(err);
      }

      return res.ok(invite);
    });
  }
};

