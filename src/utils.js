var crypto = require('crypto');

function hmac_sha1(challenge, app_token) {
  return crypto.createHmac('sha1', app_token).update(challenge).digest('hex');
}

module.exports.hmac_sha1 = hmac_sha1;
