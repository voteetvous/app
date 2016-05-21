#!/usr/bin/env node --harmony --harmony_trailing_commas
/* eslint-disable import/no-extraneous-dependencies */

const Koa = require('koa');
const serve = require('koa-static');
const middleware = require('koa-webpack');
const Webpack = require('webpack');
const rewrite = require('koa-rewrite');
const proxy = require('koa-proxy');
const config = require('./webpack.config.dev.js');

const PORT = 4001;

const app = new Koa();

const compiler = Webpack(config);

app.use(proxy({
  host: 'https://app-dev.vote-et-vous.fr',
  match: /^\/graphql/,
}));
app.use(rewrite('/sessions/:id/results', '/'));
app.use(async (ctx, next) => {
  await next();
});

app.use(middleware({
  compiler,
}));
app.use(serve(`${__dirname}/dist`));

app.use(async (ctx) => {
  ctx.body = 'not found';
  ctx.status = 404;
});

app.listen(PORT);
console.log(`Now listening to ${PORT}.`);
