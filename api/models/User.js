const bcrypt = require('bcrypt-nodejs');

/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    uid: {
      type: 'string',
      // unique: true,
      // required: true
    },

    username: {
      type: 'string',
      isEmail: true,
      unique: true,
      required: true
    },
    password: {
      type: 'string',
      required: true
    },

    first_name: {
      type: 'string',
    },

    last_name: {
      type: 'string'
    },

    status: {
      type: 'string'
    },

    status_message: {
      type: 'string'
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    events: {
      collection: 'event',
      via: 'owner'
    },

    groups: {
      collection: 'group',
      via: 'users'
    }
  },

  customToJSON: function () {
    // return this;
    this['full_name'] = this.first_name + ' ' + this.last_name;

    return _.omit(this, ['password']);
  },

  beforeCreate: function (user, cb) {
    sails.log('before user created lets add guid', user);
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(user.password, salt, null, function (err, hash) {
        if (err) return cb(err);
        user.uid = guid();
        user.password = hash;
        sails.log('User created - ', JSON.stringify(user));
        return cb();
      });
    });
  },

  beforeUpdate: (user, cb) => {
    sails.log('before user updating lets', JSON.stringify(user));
    if (!user.password) {
      return cb();
    }
    sails.log('got new password...', JSON.stringify(user));
    return cb();
    // bcrypt.genSalt(10, function (err, salt) {
    //   bcrypt.hash(user.password, salt, null, function (err, hash) {
    //     if (err) return cb(err);
    //     user.password = hash;
    //     sails.log('User updates - ', JSON.stringify(user));
    //     return cb();
    //   });
    // });
  }

};

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
