/**
 * EventController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  index: (req, res) => {
    Event.find().exec((err, events) => {
      if (err) {
        sails.log.info('[EventIndex Error] : ', JSON.stringify(err));
        return res.badRequest(err);
      }

      return res.ok(events);
    })
  },

  create: (req, res) => {

    data = {
      name: req.body.name,
      owner:req.body.owner.id
    }

    Event.create(data).fetch().exec((err, event) => {
      if (err) {
        sails.log.info('[EventCreate Error] : ', JSON.stringify(err));
        return res.badRequest(err);
      }

      return res.ok(event);
    });
  },

  update: (req, res) => {

    if (!req.body) {
      return res.badRequest(err);
    }

    newData = {
      name: req.body.name,
    }

    Event.update({
        uid: req.body.uid
      }, newData).fetch()
      .exec((err, event) => {
        if (err || event.length == 0) {
          sails.log.info('[EventEdit Error] : ', JSON.stringify(err));
          return res.badRequest(err);
        }

        return res.ok(event);
      });
  },

  destroy: (req, res) => {

    sails.log.info('[EventDestroy trying] : ', JSON.stringify(req.body));

    data = {
      uid: req.body.uid || ''
    }

    Event.destroy(data).fetch().exec((err, event) => {
      sails.log.info('[EventDestroy anything] : ', JSON.stringify(event));
      if (err) {
        sails.log.info('[EventDestroy Error] : ', JSON.stringify(err));
        return res.badRequest(err);
      }

      return res.ok(event);
    });
  },

  view: (req, res) => {
    if (!req.params && !req.params.uid) {
      return res.badRequest(err);
    }
    let data = {
      uid: req.params.uid
    }
    Event
      .findOne(data)
      .populate('addresses')
      .populate('owner')
      .exec((err, event) => {
        if (err) {
          sails.log.info('[EventView Error] : ', JSON.stringify(err));
          return res.badRequest(err);
        }

        return res.ok(event);
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
