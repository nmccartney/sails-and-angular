/**
 * MessageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  index: (req, res) => {

    if (req.isSocket) {
      Group.subscribe(req, [req.params.id]);
      sails.log.info('getting isSocket message: ', req.params);
      // sails.log.info('getting isSocket message: ', req.socket );
      return res.ok();
    }

    sails.log.info('getting message: ', req.params);
    if (!req.params && !req.params.id) {
      return res.badRequest(err);
    }

    Message.find({
        group: req.params.id
      })
      .populate('author')
      .exec((err, message) => {
        if (err) {
          sails.log.info('[MessageIndex Error] : ', JSON.stringify(err));
          return res.badRequest(err);
        }

        return res.ok(message);
      });
  },

  create: (req, res) => {
    sails.log.info('creating message: ', req.body);
    if (!req.body && !req.body.content && !req.body.type) {
      return res.badRequest(err);
    }

    newData = {
      content: req.body.content,
      type: req.body.type,
      author: req.body.author,
      group: req.body.group,
    }

    Message
      .create(newData)
      .fetch()
      .exec((err, message) => {
        if (err) {
          sails.log.info('[MessageCreate Error] : ', JSON.stringify(message));
          return res.badRequest(err);
        }
        Group.publish([newData.group], message);
        sails.log.info(Group.getRoomName(newData.group));
        return res.ok(message);
      });
  },

  destroy: (req, res) => {

    sails.log.info('[MessageDestroy trying] : ', JSON.stringify(req.body));

    if (!req.body && !req.body.uid) {
      return res.badRequest(err);
    }

    data = {
      uid: req.body.uid
    };

    Message.destroy(data).fetch().exec((err, event) => {
      sails.log.info('[MessageDestroy anything] : ', JSON.stringify(event));
      if (err) {
        sails.log.info('[MessageDestroy Error] : ', JSON.stringify(err));
        return res.badRequest(err);
      }

      return res.ok(event);
    });
  },

  detail: (req, res) => {
    if (!req.params) {
      return res.badRequest(err);
    }
    Message.find({ uid: req.params.uid })
      .populate('author')
      .exec((err, message) => {
        if (err) {
          sails.log.info('[MessageDetail Error] : ', JSON.stringify(err));
          return res.badRequest(err);
        }

        return res.ok(message);
      });
  },

};
