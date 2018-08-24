
/**
 * List Redis cache times for individual routes
 */

const options = {
  routes: [{
    path: '/v2/launches',
    expire: 30,
  }, {
    path: '/v2/launches/(.*)',
    expire: 30,
  }, {
    path: '/v2/payloads',
    expire: 30,
  }, {
    path: '/v2/payloads/(.*)',
    expire: 30,
  }, {
    path: '/v2/parts/(.*)',
    expire: 6000,
  }, {
    path: '/v2',
    expire: 86400,
  }, {
    path: '/v2/info',
    expire: 86400,
  }, {
    path: '/v2/info/(.*)',
    expire: 300,
  }, {
    path: '/v2/launchpads/(.*)',
    expire: 86400,
  }, {
    path: '/v2/launchpads',
    expire: 86400,
  }, {
    path: '/v2/rockets/(.*)',
    expire: 86400,
  }, {
    path: '/v2/rockets',
    expire: 86400,
  }, {
    path: '/v2/capsules/(.*)',
    expire: 86400,
  }, {
    path: '/v2/capsules',
    expire: 86400,
  }],
  passParam: 'pretty',
};

module.exports = options;
