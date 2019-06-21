require('@babel/polyfill');
require('dotenv/config');
const express = require('express');
const expressHbs = require('express-handlebars');
const compression = require('compression');
const appMiddleware = require('../dist/server').default;

const app = express();
app.engine('hbs', expressHbs());
app.set('view engine', 'hbs');
app.set('views', './dist/views');

app.use(
  '/static',
  compression(),
  express.static('dist', { maxAge: '1y', etag: false }),
);

app.use(appMiddleware());

const port = process.env.PORT || 3000;

app.listen(port, '0.0.0.0', () => {
  console.log(`Listening on port ${port}!`);
});
