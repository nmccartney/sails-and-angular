/**
 * Event.js
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
    },

    name: {
      type: 'string',
      required: true
    },

    description: {
      type: 'string'
    },

    start_time:{
      type: 'string'
    },
    end_time:{
      type: 'string'
    },

    place_id: {
      type: 'string'
    },

    location: {
      type: 'string'
    },

    gps: {
      type: 'json'
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    addresses: {
      collection: 'address',
      via: 'event'
    },

    owner: {
      model: 'user'
    },

    group: {
      model:'group'
    }
    // invited: {
    //   collection: 'user',
    //   via: 'events'
    // },

    // going: {
    //   collection: 'user',
    // },

    // denied: {
    //   collection: 'user',
    // },

    // interested: {
    //   collection: 'user',
    // }
  },

  beforeCreate: function (group, cb) {
    group.uid = guid();
    sails.log('before event created lets add guid', group);
    return cb();
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
