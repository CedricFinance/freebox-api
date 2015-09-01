var chai = require('chai')
var expect = chai.expect

var utils = require('../src/utils');

describe('utils', function() {
  describe('#hmac_sha1', function() {
    it('should compute the hmac SHA1', function() {
      expect(utils.hmac_sha1('challenge', 'token')).to.equal('0c534563a85c1e77106850f4fe745daa1be1ebea');
    })
  })
})
