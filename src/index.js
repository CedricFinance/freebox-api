var rp = require('request-promise')

function major_api_version(version) {
  return version.split(".")[0];
}

function FreeboxAPI(params) {
  this.freebox_url = 'http://mafreebox.freebox.fr';

  this.api_url = this.freebox_url+params.api_path;
}

FreeboxAPI.prototype.api_version = function() {
  return rp({ url: this.freebox_url+'/api_version', json: true })
}

FreeboxAPI.prototype.authorize = function(params) {
  return rp({
    method: "POST",
    body: params,
    json: true,
    url: this.api_url+'/login/authorize'
  })
}

FreeboxAPI.prototype.track_authorization_progress = function(id) {
  return rp({ url: this.api_url+'/login/authorize/'+id, json: true })
}

FreeboxAPI.prototype.login = function(session_token) {
  return rp({ url: this.api_url+'/login', json: true, headers: {'X-Fbx-App-Auth': session_token} })
}

FreeboxAPI.prototype.openSession = function(params) {
  var session_params = {
    app_id: params.app_id,
    password: params.password
  }
  return rp({
    method: "POST",
    body: session_params,
    url: this.api_url+'/login/session',
    json: true
  })
}

FreeboxAPI.prototype.call_log = function(session_token) {
  return rp({ url: this.api_url+'/call/log/', json: true, headers: {'X-Fbx-App-Auth': session_token} })
}

module.exports = FreeboxAPI;
