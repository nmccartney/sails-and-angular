/**
 * 401 (Unauthorized) Response
 * Similar to 403 Forbidden.
 * Specifically for authentication failed or not yet provided.
 */
module.exports = function (data, code, message, root) {

  // console.log('Sent (401 UNAUTHORIZED)\n', response);

  var response = _.assign({
    code: code || 'E_UNAUTHORIZED',
    message: message || 'Missing or invalid authentication token',
    data: data || {}
  }, root);

  this.req._sails.log.info('Sent (401 UNAUTHORIZED)\n', response.message.message || 'Missing of invalid token');

  this.res.status(401);
  this.res.send(response);
};
