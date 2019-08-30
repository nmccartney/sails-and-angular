/**
 * UserInviteController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: (req, res) => {
    UserInvite.find().exec((err, invites) => {
      if (err) {
        sails.log.info('[UserInvite.Index Error] : ', JSON.stringify(err));
        return res.badRequest(err);
      }
      return res.ok(invites);
    });
  },

  create: (req, res) => {

    if (!req.body && !req.body.owner && !req.body.invited && !req.body.group) {
      return res.badRequest(err);
    }

    newData = {
      invited: req.body.invited,
      owner: req.body.owner,
      group: req.body.group
    };

    UserInvite
      .create(newData)
      .fetch()
      .exec((err, group) => {
        if (err) {
          sails.log.info('[UserInvite.create Error] : ', JSON.stringify(err));
          return res.badRequest(err);
        }

        return res.ok(group);
      });
  },

  update: (req, res) => {
    if (!req.body && !req.body.uid && !req.body.accepted) {
      return res.badRequest(err);
    }

    var newData = {
      accepted: true,
      deny: false
    };

    UserInvite.update({
      uid: req.body.uid
    }, newData)
      .fetch()
      .exec((err, invite) => {
        if (err || invite.length == 0) {
          sails.log.info('[UserInvite.accept Error] : ', JSON.stringify(err));
          return res.badRequest(err);
        }

        return res.ok(invite);
      });
  },

};

