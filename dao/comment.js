/**
 * User: willerce
 * Date: 11/1/12
 * Time: 8:57 PM
 */

var mongoose = require('../config.js').mongoose;
var CommentModel = mongoose.model('comment',
    {post_id: mongoose.Schema.Types.ObjectId, post_slug: String, author: String, email: String, url: String, content: String, created: Date});

exports.all = function (condition, limit, callback) {
  CommentModel.find(condition).limit(limit).sort({created: -1, _id: -1}).exec(function (err, result) {
    callback(err, result);
  });
};

exports.insert = function (obj, callback) {
  CommentModel.create(obj, function (err, result) {
    callback(err, result);
  });
};

exports.findByPostId = function (post_id, callback) {
  CommentModel.find({post_id: post_id, status: {$ne: "0"}}).sort({created: 1}).exec(function (err, result) {
    callback(err, result);
  });
};

exports.findOne = function (id, callback) {
  CommentModel.findOne({_id: id}, function (err, result) {
    callback(err, result);
  });
};

exports.save = function (obj, callback) {
  CommentModel.save(obj, function (err, result) {
    callback(err, result);
  })
};

exports.deleteById = function (id, callback) {
  CommentModel.remove({_id: id}, function (err, result) {
    callback(err, result);
  })
};

exports.updateAvater = function (id, avater, callback) {
  CommentModel.update({_id: id}, {$set: {avatar:avater} }, function (err, result) {
    callback(err, result);
  })
};