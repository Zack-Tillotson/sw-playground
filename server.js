const https = require('https');

const Koa = require('koa');
const serve = require('koa-static');
const convert = require('koa-convert');

const fs = require('fs')

const app = new Koa();
const tlsOpts = {
  key: fs.readFileSync('./hacksparrow-key.pem'),
  cert: fs.readFileSync('./hacksparrow-cert.pem')
}


app.use(serve(__dirname + '/client'));
https.createServer(tlsOpts, app.callback()).listen(443)

