var rp = require('request-promise')

function major_api_version(version) {
  return version.split(".")[0];
}

function Freebox() {
  this.freebox_url = 'http://mafreebox.freebox.fr';
}

Freebox.prototype.api_version = function() {
  return rp({ url: this.freebox_url+'/api_version', transform: JSON.parse })
}

Freebox.prototype.api_url = function() {
  var base_url = this.freebox_url;
  return this.api_version().then(function(version) {
    return base_url + version.api_base_url + 'v' + major_api_version(version.api_version)
  });
}

module.exports = Freebox;
