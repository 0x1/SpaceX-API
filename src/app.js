
const Koa = require('koa');
const cache = require('koa-redis-cache');
const options = require('./db/redis');
const compress = require('koa-compress');
const logger = require('koa-logger');
const cors = require('koa-cors');
const helmet = require('koa-helmet');
const MongoClient = require('mongodb');
const json = require('koa-json');

const home = require('./v2-routes/v2-home');
const info = require('./v2-routes/v2-info');
const rockets = require('./v2-routes/v2-rockets');
const capsules = require('./v2-routes/v2-capsules');
const launchpad = require('./v2-routes/v2-launchpad');
const launches = require('./v2-routes/v2-launches');
const upcoming = require('./v2-routes/v2-upcoming');
const parts = require('./v2-routes/v2-parts');

// Production read-only DB
const url = 'mongodb+srv://public:spacex@spacex-api-rzdz4.mongodb.net/spacex-api';

const app = new Koa();

// Gzip all responses
app.use(compress());

// HTTP header security
app.use(helmet());

// Enable CORS for all routes
const corsOpt = {
  origin: '*',
};
app.use(cors(corsOpt));

// Add pretty output option for debugging
app.use(json({ pretty: false, param: 'pretty' }));

// Hide logging when running tests
// Disable Redis caching when running tests
if (process.env.NODE_ENV !== 'test') {
  app.use(logger());
  app.use(cache(options));
}

// Koa routes
app.use(home.routes());
app.use(info.routes());
app.use(rockets.routes());
app.use(capsules.routes());
app.use(launchpad.routes());
app.use(launches.routes());
app.use(upcoming.routes());
app.use(parts.routes());

// Error Handler
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});

module.exports = app;

// Mongo Connection + Server Start
MongoClient.connect(url, (err, client) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  global.db = client.db('spacex-api');

  const port = process.env.PORT || 5000;
  app.listen(port, '0.0.0.0', () => {
    app.emit('ready');
  });
});
