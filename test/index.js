var chai = require('chai')
var expect = chai.expect
var nock = require('nock')

var Freebox = require('../src/index')

describe('Freebox', function() {

  var freebox;

  before(function() {
    freebox = new Freebox({ api_path: "/api/v3" });
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

  describe('#authorize', function() {

    var authRequestParams = {
      app_id: 'fr.freebox.testapp',
      app_name: 'Test App',
      app_version: '0.0.7',
      device_name: 'Pc de Xavier'
    }

    beforeEach(function() {
      nock("http://mafreebox.freebox.fr")
        .post("/api/v3/login/authorize", authRequestParams)
        .reply(200, {
          success: true,
          result: {
            app_token: 'dumbtoken',
            track_id: 1
          }
        });
    })

    it('should return a fulfilled promise', function() {
      var result = freebox.authorize(authRequestParams)

      expect(result).to.be.fulfilled
    })

    it('should be an object', function() {
      var result = freebox.authorize(authRequestParams)

      result.then(function(value) {
        expect(value).to.be.an("object")
      })
    })

    it('should have a success property', function() {
      var result = freebox.authorize(authRequestParams)

      result.then(function(value) {
        expect(value).to.have.a.property("success")
      })
    })

    it('should have a result property', function() {
      var result = freebox.authorize(authRequestParams)

      result.then(function(value) {
        expect(value).to.have.a.property("result")
      })
    })

    it('should have a result.app_token property', function() {
      var result = freebox.authorize(authRequestParams)

      result.then(function(value) {
        expect(value.result).to.have.a.property("app_token")
      })
    })

    it('should have a result.track_id property', function() {
      var result = freebox.authorize(authRequestParams)

      result.then(function(value) {
        expect(value.result).to.have.a.property("track_id")
      })
    })

  })

  describe('#track_authorization_progress', function() {

    beforeEach(function() {
      nock("http://mafreebox.freebox.fr")
        .get("/api/v3/login/authorize/1")
        .reply(200, {
          success: true,
          result: {
            status: 'pending',
            challenge: 'dumbChallenge',
            password_salt: 'dumbSalt'
          }
        });
    })

    it('should return a fulfilled promise', function() {
      var result = freebox.track_authorization_progress(1)

      expect(result).to.be.fulfilled
    })

    it('should be an object', function() {
      var result = freebox.track_authorization_progress(1)

      result.then(function(value) {
        expect(value).to.be.an("object")
      })
    })

    it('should have a success property', function() {
      var result = freebox.track_authorization_progress(1)

      result.then(function(value) {
        expect(value).to.have.a.property("success")
      })
    })

    it('should have a result property', function() {
      var result = freebox.track_authorization_progress(1)

      result.then(function(value) {
        expect(value).to.have.a.property("result")
      })
    })

    it('should have a result.status property', function() {
      var result = freebox.track_authorization_progress(1)

      result.then(function(value) {
        expect(value.result).to.have.a.property("status")
      })
    })

    it('should have a result.challenge property', function() {
      var result = freebox.track_authorization_progress(1)

      result.then(function(value) {
        expect(value.result).to.have.a.property("challenge")
      })
    })

    it('should have a result.password_salt property', function() {
      var result = freebox.track_authorization_progress(1)

      result.then(function(value) {
        expect(value.result).to.have.a.property("password_salt")
      })
    })

  })

  describe('#login', function() {

    beforeEach(function() {
      nock("http://mafreebox.freebox.fr")
        .get("/api/v3/login")
        .reply(200, {
          "success": true,
          "result": {
              "logged_in": false,
              "challenge": "VzhbtpR4r8CLaJle2QgJBEkyd8JPb0zL"
          }
        });
    })

    it('should return a fulfilled promise', function() {
      var result = freebox.login()

      expect(result).to.be.fulfilled
    })

    it('should be an object', function() {
      var result = freebox.login()

      result.then(function(value) {
        expect(value).to.be.an("object")
      })
    })

    it('should have a success property', function() {
      var result = freebox.login()

      result.then(function(value) {
        expect(value).to.have.a.property("success")
      })
    })

    it('should have a result property', function() {
      var result = freebox.login()

      result.then(function(value) {
        expect(value).to.have.a.property("result")
      })
    })

    it('should have a result.logged_in property', function() {
      var result = freebox.login()

      result.then(function(value) {
        expect(value.result).to.have.a.property("logged_in")
      })
    })

    it('should have a result.challenge property', function() {
      var result = freebox.login()

      result.then(function(value) {
        expect(value.result).to.have.a.property("challenge")
      })
    })

  })

  describe('#openSession', function() {

    beforeEach(function() {
      nock("http://mafreebox.freebox.fr")
        .post("/api/v3/login/session", { app_id: "fr.freebox.testapp", password: "password" })
        .reply(200, {
          "success": true,
          "result" : {
                "session_token" : "35JYdQSvkcBYK84IFMU7H86clfhS75OzwlQrKlQN1gBch\/Dd62RGzDpgC7YB9jB2",
                "challenge":"jdGL6CtuJ3Dm7p9nkcIQ8pjB+eLwr4Ya",
                "permissions": {
                      "downloader": true,
                }
           }
        });
    })

    it('should return a fulfilled promise', function() {
      var result = freebox.openSession({ app_id: "fr.freebox.testapp", password: "password" })

      expect(result).to.be.fulfilled
    })


    it('should be an object', function() {
      var result = freebox.openSession({ app_id: "fr.freebox.testapp", password: "password" })

      result.then(function(value) {
        expect(value).to.be.an("object")
      })
    })

    it('should have a success property', function() {
      var result = freebox.openSession({ app_id: "fr.freebox.testapp", password: "password" })

      result.then(function(value) {
        expect(value).to.have.a.property("success")
      })
    })

    it('should have a result property', function() {
      var result = freebox.openSession({ app_id: "fr.freebox.testapp", password: "password" })

      result.then(function(value) {
        expect(value).to.have.a.property("result")
      })
    })

    it('should have a result.session_token property', function() {
      var result = freebox.openSession({ app_id: "fr.freebox.testapp", password: "password" })

      result.then(function(value) {
        expect(value.result).to.have.a.property("session_token")
      })
    })

    it('should have a result.challenge property', function() {
      var result = freebox.openSession({ app_id: "fr.freebox.testapp", password: "password" })

      result.then(function(value) {
        expect(value.result).to.have.a.property("challenge")
      })
    })

    it('should have a result.permissions property', function() {
      var result = freebox.openSession({ app_id: "fr.freebox.testapp", password: "password" })

      result.then(function(value) {
        expect(value.result).to.have.a.property("permissions")
      })
    })

  })

})
