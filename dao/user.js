/**
 * User: willerce
 * Date: 9/6/12
 * Time: 10:32 PM
 */

var mongoose = require('../config.js').mongoose;

var userModel = mongoose.model('user', {name: String, password: String});

exports.insert = function (user, callback) {
  var userEntity = new userModel(user);
  userEntity.save(function(err, result){
    callback(err, result);
  });
};

exports.findAll = function (query, callback) {
  userModel.find(function(err, result){
    callback(err, result);
  });
};

exports.get = function (name, callback) {
  userModel.findOne({name: name},function(err, result){
    callback(err, result);
  });
};