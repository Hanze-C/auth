const qs = require('qs');
const Koa = require('koa');
const services = require('./src');
const app = new Koa();

app.use(async (ctx, next) => {
  const type = ctx.path.slice(1).toLowerCase();
  if(/^wb_[a-z0-9]+\.txt/.test(type)) {
    return this.ctx.body = 'open.weibo.com';
  }
  
  if(!services[type]) {
    return next();
  }
  
  ctx.params = qs.parse(ctx.search.slice(1));

  const service = new services[type](ctx);
  return service.getUserInfo();
});

module.exports = app.callback();