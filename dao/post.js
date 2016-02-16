/**
 * User: willerce
 * Date: 9/5/12
 * Time: 11:01 PM
 */

var mongoose = require('../config.js').mongoose;
var PostModel = mongoose.model('post', {title: String, slug: String, content: String, created: Date});

exports.all = function (callback) {
  PostModel.find({}, {"content": 0}).sort({created: -1, _id: -1}).exec(function (err, result) {
    callback(err, result)
  });
};

exports.findAll = function (skip, limit, callback) {
  PostModel.find().sort({created: -1, _id: -1}).skip(skip).limit(limit).exec(function (err, result) {
    callback(err, result)
  });
};

exports.findByTag = function (tag, callback) {
  PostModel.find({tags: tag }).sort({created: -1, _id: -1}).exec(function (err, result) {
    callback(err, result)
  });
};

exports.get = function (condition, callback) {
  PostModel.findOne(condition, function (err, result) {
    callback(null, result);
  });
};

exports.insert = function (obj, callback) {
  var post = new PostModel(obj);
  post.save(function(err, result){
    callback(err, result);
  });
};

exports.update = function (old_slug, post, callback) {
  PostModel.update({slug: old_slug}, {$set: post }, function (err, result) {
    callback(err, result);
  })
};

exports.delete = function (slug, callback) {

};

exports.count = function (condition, callback) {
  PostModel.count(condition, function (err, count) {
    callback(err, count);
  });
};
