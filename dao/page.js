/**
 * User: willerce
 * Date: 9/8/12
 * Time: 5:51 PM
 */

var mongoose = require('../config.js').mongoose;
var PageModel = mongoose.model('page', {
  title: String, slug: String, content: String, content_html:{}, created: Date
});

exports.all = function (callback) {
  PageModel.find().sort({created:-1}).exec(function (err, result) {
    callback(err, result)
  });
};

exports.get = function (condition, callback) {
  PageModel.findOne(condition, function (err, result) {
    callback(err, result);
  });
};

exports.insert = function (obj, callback) {
  PageModel.create(obj, function (err, result) {
    callback(err, result);
  });
};

exports.update = function (old_slug, page, callback) {
  PageModel.update({slug:old_slug}, {$set:page }, function (err, result) {
    callback(err, result);
  })
};