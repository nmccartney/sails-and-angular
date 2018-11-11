/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions, unless overridden.       *
   * (`true` allows public access)                                            *
   *                                                                          *
   ***************************************************************************/

  '*': ['authenticated', 'hasJWT'],
  // whitelist the auth controller
  'auth': {
    '*': true
  },
  'user': {
    '*': true,
    'view': [
      'hasJWT',
      'authenticated',
    ],
    'checkIn': [
      'hasJWT',
      'authenticated',
    ]
  },
  'group': {
    '*': true
  }

};
