/**
 * GroupController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  index: (req, res) => {
    Group.find().exec((err, groups) => {
      if (err) {
        sails.log.info('[GroupIndex Error] : ', JSON.stringify(err));
        return res.badRequest(err);
      }

      return res.ok(groups);
    })
  },

  create: (req, res) => {

    data = {
      name: req.body.name,
      owner: req.body.owner
    }

    Group.create(data).fetch().exec((err, group) => {
      if (err) {
        sails.log.info('[GroupCreate Error] : ', JSON.stringify(err));
        return res.badRequest(err);
      }

      return res.ok(group);
    });
  },

  update: (req, res) => {

    if (!req.body) {
      return res.badRequest(err);
    }

    newData = {
      name: req.body.name,
      owner: req.body.owner,
      users: convertUserObjectToId(req.body.users) || []
    };

    Group.update({
        uid: req.body.uid
      }, newData).fetch()
      .exec((err, group) => {
        if (err || group.length == 0) {
          sails.log.info('[GroupEdit Error] : ', JSON.stringify(err));
          return res.badRequest(err);
        }

        return res.ok(group);
      });
  },

  destroy: (req, res) => {

    sails.log.info('[GroupDestroy trying] : ', JSON.stringify(req.body));

    data = {
      uid: req.body.uid || ''
    }

    Group.destroy(data).fetch().exec((err, group) => {
      sails.log.info('[GroupDestroy anything] : ', JSON.stringify(group));
      if (err) {
        sails.log.info('[GroupDestroy Error] : ', JSON.stringify(err));
        return res.badRequest(err);
      }

      return res.ok(group);
    });
  },

  view: (req, res) => {
    if (!req.params && !req.params.uid) {
      return res.badRequest(err);
    }
    let data = {
      uid: req.params.uid
    }
    Group
      .findOne(data)
      .populate('owner')
      .populate('users')
      .exec((err, group) => {
        if (err) {
          sails.log.info('[GroupView Error] : ', JSON.stringify(err));
          return res.badRequest(err);
        }

        return res.ok(group);
      })
  }

};


function convertUserObjectToId(users) {
  newUsers = []
  for (var i = 0; i < users.length; i++) {
    newUsers.push(users[i].id);
  }
  return newUsers;
}
