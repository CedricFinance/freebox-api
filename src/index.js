var rp = require('request-promise')

function major_api_version(version) {
  return version.split(".")[0];
}

function Freebox() {
  this.freebox_url = 'http://mafreebox.freebox.fr';
}

Freebox.prototype.api_version = function() {
  return rp({ url: this.freebox_url+'/api_version', json: true })
}

Freebox.prototype.authorize = function(params) {
  return rp({
    method: "POST",
    body: params,
    json: true,
    url: this.freebox_url+'/login/authorize'
  })
}

Freebox.prototype.track_authorization_progress = function(id) {
  return rp({ url: this.freebox_url+'/login/authorize/'+id, json: true })
}


module.exports = Freebox;
