const http = require('http');

const Koa = require('koa');
const serve = require('koa-static');
const etag = require('koa-etag');
const conditional = require('koa-conditional-get');
const delay = require('koa-delay');

const fs = require('fs')

const app = new Koa();

app.use(conditional());
app.use(etag());
app.use(delay(300, 300));
app.use(serve(__dirname + '/client'));

http.createServer(app.callback()).listen(3001)

