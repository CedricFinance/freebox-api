var chai = require('chai')
var expect = chai.expect
var nock = require('nock')

var Freebox = require('../src/index')

describe('Freebox', function() {

  var freebox;

  before(function() {
    freebox = new Freebox();
  })

  describe('#api_version', function() {

    beforeEach(function() {
      nock("http://mafreebox.freebox.fr")
        .get("/api_version")
        .reply(200, {
          api_base_url: "/api",
          api_version: "3.0",
          device_name: "Freebox Server",
          device_type: "FreeboxServer1,1"
        });
    })

    it('should return a fulfilled promise', function() {
        expect(freebox.api_version()).to.be.fulfilled;
    })

    it('should be an object', function() {
        freebox.api_version().then(function(version) {
          expect(version).to.be.an("object")
        })
    })

    it('should have an api_base_url property', function(done) {
        freebox.api_version().then(function(version) {
          expect(version).to.have.a.property("api_base_url")
          done()
        })
    })

    it('should have an api_version property', function() {
        freebox.api_version().then(function(version) {
          expect(version).to.have.a.property("api_version")
        })
    })

    it('should have an device_name property', function() {
        freebox.api_version().then(function(version) {
          expect(version).to.have.a.property("device_name")
        })
    })

    it('should have an device_type property', function() {
        freebox.api_version().then(function(version) {
          expect(version).to.have.a.property("device_type")
        })
    })

  })

  describe('#api_url', function() {

    beforeEach(function() {
      nock("http://mafreebox.freebox.fr")
        .get("/api_version")
        .reply(200, {
          api_base_url: "/api/",
          api_version: "3.0",
          device_name: "Freebox Server",
          device_type: "FreeboxServer1,1"
        });
    })

    it('should return a fulfilled promise', function() {
        expect(freebox.api_url()).to.be.fulfilled;
    })

    it('should be a string', function() {
        freebox.api_url().then(function(url) {
          expect(url).to.be.a("string")
        })
    })

    it('should be the freebox api URL', function(done) {
        freebox.api_url().then(function(url) {
          expect(url).to.be.equal("http://mafreebox.freebox.fr/api/v3")
          done()
        })
    })

  })

})
