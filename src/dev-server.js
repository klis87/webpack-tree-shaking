require('@babel/polyfill');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const expressHbs = require('express-handlebars');

const webpackConfig = require('../webpack.config');

const app = express();
app.engine('hbs', expressHbs());
app.set('view engine', 'hbs');
app.set('views', './dist/views');

const webpackCompiler = webpack(webpackConfig);

app.use('/static', express.static(path.join(__dirname, 'locales')));
app.use(
  webpackDevMiddleware(webpackCompiler, {
    publicPath: '/static/',
    serverSideRender: true,
    writeToDisk: filePath => /.hbs$/.test(filePath),
  }),
);
app.use(
  webpackHotMiddleware(
    webpackCompiler.compilers.find(compiler => compiler.name === 'client'),
  ),
);
app.use(webpackHotServerMiddleware(webpackCompiler));

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});
