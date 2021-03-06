/**
 * EventInviteController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  index: (req, res) => {
    EventInvite.find().exec((err, invites) => {
      if (err) {
        sails.log.info('[AppInvite.Index Error] : ', JSON.stringify(err));
        return res.badRequest(err);
      }

      return res.ok(invites);
    });
  },

  create: (req, res) => {

    if (!req.body && !req.body.owner && !req.body.invited && !req.body.event) {
      return res.badRequest(err);
    }

    newData = {
      invited: req.body.invited,
      owner: req.body.owner,
      event: req.body.event
    };

    EventInvite
      .create(newData)
      .fetch()
      .exec((err, event) => {
        if (err) {
          sails.log.info('[AppInvite.create Error] : ', JSON.stringify(err));
          return res.badRequest(err);
        }

        return res.ok(event);
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

    EventInvite.update({
      uid: req.body.uid
    }, newData)
      .fetch()
      .exec((err, invite) => {
        if (err || invite.length == 0) {
          sails.log.info('[EventInvite.accept Error] : ', JSON.stringify(err));
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

    EventInvite.update({
      uid: req.body.uid
    }, newData)
      .fetch()
      .exec((err, invite) => {
        if (err || invite.length == 0) {
          sails.log.info('[EventInvite.deny Error] : ', JSON.stringify(err));
          return res.badRequest(err);
        }

        return res.ok(invite);
      });
  },


};
