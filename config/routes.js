/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

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

  '/': {
    view: 'pages/ng-app'
  },

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
  'post /login': 'AuthController.login',
  'post /register': 'AuthController.register',
  'get /check-in': 'AuthController.checkIn',
  '/logout': 'AuthController.logout',

  'get /view': 'UserController.view',
  'get /user/:uid': 'UserController.detail',
  'get /user/:uid/groups': 'UserController.groups',
  'get /user/:uid/events': 'UserController.events',

  'get /group': 'GroupController.index',// protect as master
  'post /group': 'GroupController.create',
  'delete /group': 'GroupController.destroy',
  'get /group/:uid': 'GroupController.view',
  'post /group/:uid': 'GroupController.update',

  'get /event': 'EventController.index',// protect as master
  'post /event': 'EventController.create',
  'delete /event': 'EventController.destroy',
  'get /event/:uid': 'EventController.view',
  'post /event/:uid': 'EventController.update',

  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝


};
