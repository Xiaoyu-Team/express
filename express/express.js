/**
 * 创建express 实例.
 */
var mixin = require('merge-descriptors');// 属性复制
var proto = require('./application');

function createApplication() {
  var app = function(req, res, next) {
    app.handle(req, res, next);
  };
  mixin(app, proto, false);
  app.init();
  return app;
}
module.exports = createApplication;