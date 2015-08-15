var rp = require('request-promise')

function major_api_version(version) {
  return version.split(".")[0];
}

function Freebox(params) {
  this.freebox_url = 'http://mafreebox.freebox.fr';

  this.api_url = this.freebox_url+params.api_path;
}

Freebox.prototype.api_version = function() {
  return rp({ url: this.freebox_url+'/api_version', json: true })
}

Freebox.prototype.authorize = function(params) {
  return rp({
    method: "POST",
    body: params,
    json: true,
    url: this.api_url+'/login/authorize'
  })
}

Freebox.prototype.track_authorization_progress = function(id) {
  return rp({ url: this.api_url+'/login/authorize/'+id, json: true })
}

Freebox.prototype.login = function() {
  return rp({ url: this.api_url+'/login', json: true })
}

Freebox.prototype.openSession = function(params) {
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

module.exports = Freebox;
