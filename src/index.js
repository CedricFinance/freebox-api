var rp = require('request-promise')
var Promise = require('bluebird')

var utils = require('./utils')

function FreeboxAPI(params) {
  this.freebox_url = 'http://mafreebox.freebox.fr';

  this.api_url = this.freebox_url+params.api_path;
}

FreeboxAPI.prototype.api_version = function() {
  return rp({ url: this.freebox_url+'/api_version', json: true }).promise()
}

FreeboxAPI.prototype.authorize = function(params) {
  return rp({
    method: "POST",
    body: params,
    json: true,
    url: this.api_url+'/login/authorize'
  }).promise()
}

FreeboxAPI.prototype.track_authorization_progress = function(id) {
  return rp({ url: this.api_url+'/login/authorize/'+id, json: true }).promise()
}

FreeboxAPI.prototype.login = function(session_token) {
  return rp({ url: this.api_url+'/login', json: true, headers: {'X-Fbx-App-Auth': session_token} }).promise()
}

FreeboxAPI.prototype.openSession = function(params) {
  var session_params = {
    app_id: params.app_id,
    password: utils.hmac_sha1(params.challenge, params.app_token)
  }
  return rp({
    method: "POST",
    body: session_params,
    url: this.api_url+'/login/session',
    json: true
  }).catch(function(reason) {
    return Promise.reject(reason.response.body);
  })
}

FreeboxAPI.prototype.call_log = function(session_token) {
  return rp({ url: this.api_url+'/call/log/', json: true, headers: {'X-Fbx-App-Auth': session_token} }).promise()
}

FreeboxAPI.prototype.get_connection_status = function(session_token) {
  return rp({ url: this.api_url+'/connection/', json: true, headers: {'X-Fbx-App-Auth': session_token} }).promise()
}

FreeboxAPI.prototype.get_connection_config = function(session_token) {
  return rp({ url: this.api_url+'/connection/config/', json: true, headers: {'X-Fbx-App-Auth': session_token} }).promise()
}

module.exports = FreeboxAPI;
