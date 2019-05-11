/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */
const API_V1 = '/api/v1';


module.exports.routes = {


  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  '/*': {
    view: 'pages/ng-app',
    skipAssets:true
  },

  'GET /api/v1/user': 'user/find',
  'GET /api/v1/group': 'group/find',
  'GET /api/v1/event': 'event/find',

  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝

  //Auth
  // comment out of single-page app
  // 'get /login': {
  // 	view: 'user/login'
  // },
  // comment out of single-page app
  // 'get /register': {
  // 	view: 'user/register'
  // },
  'post /api/v1/login': 'AuthController.login',
  'post /api/v1/register': 'AuthController.register',
  'get /api/v1/check-in': 'AuthController.checkIn',
  '/api/v1/logout': 'AuthController.logout',

  'get /api/v1/view': 'UserController.view',
  'get /api/v1/user/:uid': 'UserController.detail',
  'post /api/v1/user/:uid': 'UserController.update',
  'get /api/v1/user/:uid/groups': 'UserController.groups',
  'get /api/v1/user/:uid/events': 'UserController.events',
  'get /api/v1/user/:uid/users': 'UserController.users',
  'delete /api/v1/user': 'UserController.destroy',
  'post /api/v1/user/:uid/invite': 'UserInviteController.create',
  'post /api/v1/user/invite/:uid': 'UserInviteController.update',


  'get /api/v1/group': 'GroupController.index',// protect as master
  'post /api/v1/group': 'GroupController.create',
  'delete /api/v1/group': 'GroupController.destroy',
  'get /api/v1/group/:uid': 'GroupController.view',
  'get /api/v1/group/:uid/users': 'GroupController.users',
  'post /api/v1/group/:uid': 'GroupController.update',

  'get /api/v1/group/:id/messages': 'MessageController.index',
  'post /api/v1/group/:uid/message': 'MessageController.create',
  'post /api/v1/message': 'MessageController.create',
  'delete /api/v1/group/:uid/message/:uid': 'MessageController.destroy',
  'delete /api/v1/message/:uid': 'MessageController.destroy',
  'get /api/v1/message/:uid': 'MessageController.detail',// protect as master


  'get /api/v1/event': 'EventController.index',// protect as master
  'post /api/v1/event': 'EventController.create',
  'delete /api/v1/event': 'EventController.destroy',
  'get /api/v1/event/:uid': 'EventController.view',
  'post /api/v1/event/:uid': 'EventController.update',

  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝


};
