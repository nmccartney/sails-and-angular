/**
 * GroupInviteController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  index: (req, res) => {
    GroupInvite.find().exec((err, invites) => {
      if (err) {
        sails.log.info('[GroupInvite.Index Error] : ', JSON.stringify(err));
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

    GroupInvite
      .create(newData)
      .fetch()
      .exec((err, group) => {
        if (err) {
          sails.log.info('[GroupInvite.create Error] : ', JSON.stringify(err));
          return res.badRequest(err);
        }

        return res.ok(group);
      });
  },

  accept: (req, res) => {
    if (!req.body && !req.body.uid && !req.body.accepted) {
      return res.badRequest(err);
    }

    var newData = {
      accepted: true,
      deny: false
    };

    GroupInvite.update({
      uid: req.body.uid
    }, newData)
      .fetch()
      .exec((err, invite) => {
        if (err || invite.length == 0) {
          sails.log.info('[GroupInvite.accept Error] : ', JSON.stringify(err));
          return res.badRequest(err);
        }

        return res.ok(invite);
      });
  },

  deny: (req, res) => {
    if (!req.body && !req.body.uid && !req.body.deny) {
      return res.badRequest(err);
    }

    var newData = {
      accepted: false,
      deny: true
    };

    GroupInvite.update({
      uid: req.body.uid
    }, newData)
      .fetch()
      .exec((err, invite) => {
        if (err || invite.length == 0) {
          sails.log.info('[GroupInvite.deny Error] : ', JSON.stringify(err));
          return res.badRequest(err);
        }

        return res.ok(invite);
      });
  },

};
