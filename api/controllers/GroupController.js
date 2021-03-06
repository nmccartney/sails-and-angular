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
    });
  },

  create: (req, res) => {

    users = convertUserObjectToId(req.body.users);

    if (!req.body && !req.body.name && !req.body.owner) {
      err = {
        error: 'Bad Request. Must provide name & owner.',
        message: 'Error: 500 Internal Server Error. Must provide name & owner.',
        name: 'HttpErrorResponse',
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        url: 'http://localhost:1337/api/v1/group'
      };
      return res.badRequest(err);
    }

    data = {
      name: req.body.name,
      owner: req.body.owner,
      users: req.body.owner ? [...users, req.body.owner] : [...users]
    };
    sails.log.info('[GroupCreate] : ', JSON.stringify(req.body));

    Group
      .create(data)
      .fetch().exec((err, group) => {
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
      owner: req.body.owner || null,
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
    };

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
    };
    Group
      .findOne(data)
      .populate('owner')
      .populate('users')
      .populate('events')
      .exec((err, group) => {
        if (err) {
          sails.log.info('[GroupView Error] : ', JSON.stringify(err));
          return res.badRequest(err);
        }

        return res.ok(group);
      });
  },

  users: (req, res) => {
    if (!req.params && !req.params.uid) {
      return res.badRequest(err);
    }
    data = {
      uid: req.params.uid,
    };

    sails.log.
    info('[GroupUsers params] : ', JSON.stringify(req.params));


    Group.findOne(data)
      .populate('users')
      .exec((err, group) => {
        if (err) {
          sails.log.info('[GroupUsers Error] : ', JSON.stringify(err));
          return res.badRequest(err);
        }

        if (!group) {
          sails.log.info('[GroupUsers Error] : ', 'no group found');
          return res.badRequest('no user found');
        }

        return res.ok(group.users);
      });
  }
};


function convertUserObjectToId(users) {
  newUsers = [];
  if (!users) {return [];}
  for (var i = 0; i < users.length; i++) {
    newUsers.push(users[i].id);
  }
  return newUsers;
}
