var chai = require('chai')
var chai_as_promised = require('chai-as-promised')
var expect = chai.expect
var nock = require('nock')

chai.use(chai_as_promised)

var FreeboxAPI = require('../src/index')

describe('FreeboxAPI', function() {

  var freeboxAPI;

  before(function() {
    freeboxAPI = new FreeboxAPI({ api_path: "/api/v3" });
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
        expect(freeboxAPI.api_version()).to.be.fulfilled;
    })

    it('should be an object', function() {
        freeboxAPI.api_version().then(function(version) {
          expect(version).to.be.an("object")
        })
    })

    it('should have an api_base_url property', function(done) {
        freeboxAPI.api_version().then(function(version) {
          expect(version).to.have.a.property("api_base_url")
          done()
        })
    })

    it('should have an api_version property', function() {
        freeboxAPI.api_version().then(function(version) {
          expect(version).to.have.a.property("api_version")
        })
    })

    it('should have an device_name property', function() {
        freeboxAPI.api_version().then(function(version) {
          expect(version).to.have.a.property("device_name")
        })
    })

    it('should have an device_type property', function() {
        freeboxAPI.api_version().then(function(version) {
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
      var result = freeboxAPI.authorize(authRequestParams)

      expect(result).to.be.fulfilled
    })

    it('should be an object', function() {
      var result = freeboxAPI.authorize(authRequestParams)

      result.then(function(value) {
        expect(value).to.be.an("object")
      })
    })

    it('should have a success property', function() {
      var result = freeboxAPI.authorize(authRequestParams)

      result.then(function(value) {
        expect(value).to.have.a.property("success")
      })
    })

    it('should have a result property', function() {
      var result = freeboxAPI.authorize(authRequestParams)

      result.then(function(value) {
        expect(value).to.have.a.property("result")
      })
    })

    it('should have a result.app_token property', function() {
      var result = freeboxAPI.authorize(authRequestParams)

      result.then(function(value) {
        expect(value.result).to.have.a.property("app_token")
      })
    })

    it('should have a result.track_id property', function() {
      var result = freeboxAPI.authorize(authRequestParams)

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
      var result = freeboxAPI.track_authorization_progress(1)

      expect(result).to.be.fulfilled
    })

    it('should be an object', function() {
      var result = freeboxAPI.track_authorization_progress(1)

      result.then(function(value) {
        expect(value).to.be.an("object")
      })
    })

    it('should have a success property', function() {
      var result = freeboxAPI.track_authorization_progress(1)

      result.then(function(value) {
        expect(value).to.have.a.property("success")
      })
    })

    it('should have a result property', function() {
      var result = freeboxAPI.track_authorization_progress(1)

      result.then(function(value) {
        expect(value).to.have.a.property("result")
      })
    })

    it('should have a result.status property', function() {
      var result = freeboxAPI.track_authorization_progress(1)

      result.then(function(value) {
        expect(value.result).to.have.a.property("status")
      })
    })

    it('should have a result.challenge property', function() {
      var result = freeboxAPI.track_authorization_progress(1)

      result.then(function(value) {
        expect(value.result).to.have.a.property("challenge")
      })
    })

    it('should have a result.password_salt property', function() {
      var result = freeboxAPI.track_authorization_progress(1)

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
      var result = freeboxAPI.login()

      expect(result).to.be.fulfilled
    })

    it('should be an object', function() {
      var result = freeboxAPI.login()

      result.then(function(value) {
        expect(value).to.be.an("object")
      })
    })

    it('should have a success property', function() {
      var result = freeboxAPI.login()

      result.then(function(value) {
        expect(value).to.have.a.property("success")
      })
    })

    it('should have a result property', function() {
      var result = freeboxAPI.login()

      result.then(function(value) {
        expect(value).to.have.a.property("result")
      })
    })

    it('should have a result.logged_in property', function() {
      var result = freeboxAPI.login()

      result.then(function(value) {
        expect(value.result).to.have.a.property("logged_in")
      })
    })

    it('should have a result.challenge property', function() {
      var result = freeboxAPI.login()

      result.then(function(value) {
        expect(value.result).to.have.a.property("challenge")
      })
    })

  })

  describe('#openSession', function() {

    describe('when successful', function() {
      beforeEach(function() {
        nock("http://mafreebox.freebox.fr")
          .post("/api/v3/login/session", { app_id: "fr.freebox.testapp", password: "076268156f0228d3f38139fb53a61f83e656805f" })
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
        var result = freeboxAPI.openSession({ app_id: "fr.freebox.testapp", challenge: "challenge", app_token: "appToken" })

        expect(result).to.be.fulfilled
      })


      it('should be an object', function() {
        var result = freeboxAPI.openSession({ app_id: "fr.freebox.testapp", challenge: "challenge", app_token: "appToken" })

        result.then(function(value) {
          expect(value).to.be.an("object")
        })
      })

      it('should have a success property', function() {
        var result = freeboxAPI.openSession({ app_id: "fr.freebox.testapp", challenge: "challenge", app_token: "appToken" })

        result.then(function(value) {
          expect(value).to.have.a.property("success")
        })
      })

      it('should have a result property', function() {
        var result = freeboxAPI.openSession({ app_id: "fr.freebox.testapp", challenge: "challenge", app_token: "appToken" })

        result.then(function(value) {
          expect(value).to.have.a.property("result")
        })
      })

      it('should have a result.session_token property', function() {
        var result = freeboxAPI.openSession({ app_id: "fr.freebox.testapp", challenge: "challenge", app_token: "appToken" })

        result.then(function(value) {
          expect(value.result).to.have.a.property("session_token")
        })
      })

      it('should have a result.challenge property', function() {
        var result = freeboxAPI.openSession({ app_id: "fr.freebox.testapp", challenge: "challenge", app_token: "appToken" })

        result.then(function(value) {
          expect(value.result).to.have.a.property("challenge")
        })
      })

      it('should have a result.permissions property', function() {
        var result = freeboxAPI.openSession({ app_id: "fr.freebox.testapp", challenge: "challenge", app_token: "appToken" })

        result.then(function(value) {
          expect(value.result).to.have.a.property("permissions")
        })
      })
    })

    describe('when failing', function() {

      beforeEach(function() {
        nock("http://mafreebox.freebox.fr")
          .post("/api/v3/login/session")
          .reply(403, {
            "uid": "a4134b876fd",
            "success": false,
            "msg": "Erreur d'authentification de l'application",
            "result": {
              "password_salt": "AEagzhER34YDSR35hRklhj854n",
              "challenge": "n5ityh357H34hzed32gs75"
            },
            "error_code": "invalid_token"
          }
        );
      })

      it('should be rejected', function() {
        var result = freeboxAPI.openSession({ app_id: "fr.freebox.testapp", challenge: "challenge", app_token: "invalidappToken" })
        expect(result).to.be.rejected
      })

      it('should have success set to false', function() {
        var result = freeboxAPI.openSession({ app_id: "fr.freebox.testapp", challenge: "challenge", app_token: "invalidappToken" })
        return result.catch(function(result) {
          expect(result.success).to.be.false
        });
      })

      it('should have an error message', function() {
        var result = freeboxAPI.openSession({ app_id: "fr.freebox.testapp", challenge: "challenge", app_token: "invalidappToken" })
        return result.catch(function(result) {
          expect(result).to.have.property('msg');
          expect(result.msg).to.equal("Erreur d'authentification de l'application")
        });
      })

      it('should have an error code', function() {
        var result = freeboxAPI.openSession({ app_id: "fr.freebox.testapp", challenge: "challenge", app_token: "invalidappToken" })
        return result.catch(function(result) {
          expect(result).to.have.property('error_code');
          expect(result.error_code).to.equal('invalid_token');
        });
      })

    })
  })

  describe('#call_log', function() {

    var session_token = 'dumbtoken';

    beforeEach(function() {
      nock("http://mafreebox.freebox.fr")
        .get("/api/v3/call/log/")
        .reply(200, {
          "success": true,
          "result" :  [ { number: '0102030405',
            type: 'accepted',
            id: 1,
            duration: 49,
            datetime: 1439281517,
            contact_id: 0,
            line_id: 0,
            name: '0102030405',
            new: true }
          ]
        });
    })

    it('should return a fulfilled promise', function() {
      var result = freeboxAPI.call_log(session_token);

      expect(result).to.be.fulfilled
    })


    it('should be an object', function(done) {
      var result = freeboxAPI.call_log(session_token);

      result.then(function(value) {
        expect(value).to.be.an("object")
        done()
      }).catch(done);
    })

    it('should have a success property', function() {
      var result = freeboxAPI.call_log(session_token);

      result.then(function(value) {
        expect(value).to.have.a.property("success")
      })
    })

    it('should have a result property', function() {
      var result = freeboxAPI.call_log(session_token);

      result.then(function(value) {
        expect(value).to.have.a.property("result")
      })
    })

    it('should have a result property to be an array', function() {
      var result = freeboxAPI.call_log(session_token);

      result.then(function(value) {
        expect(value.result).to.be.an("array")
      })
    })

    it('should have a result[0].id property', function() {
      var result = freeboxAPI.call_log(session_token);

      result.then(function(value) {
        expect(value.result[0]).to.have.a.property("id")
      })
    })

    it('should have a result[0].type property', function() {
      var result = freeboxAPI.call_log(session_token);

      result.then(function(value) {
        expect(value.result[0]).to.have.a.property("type")
      })
    })

    it('should have a result[0].number property', function() {
      var result = freeboxAPI.call_log(session_token);

      result.then(function(value) {
        expect(value.result[0]).to.have.a.property("number")
      })
    })

    it('should have a result[0].duration property', function() {
      var result = freeboxAPI.call_log(session_token);

      result.then(function(value) {
        expect(value.result[0]).to.have.a.property("duration")
      })
    })

    it('should have a result[0].datetime property', function() {
      var result = freeboxAPI.call_log(session_token);

      result.then(function(value) {
        expect(value.result[0]).to.have.a.property("datetime")
      })
    })

    it('should have a result[0].contact_id property', function() {
      var result = freeboxAPI.call_log(session_token);

      result.then(function(value) {
        expect(value.result[0]).to.have.a.property("contact_id")
      })
    })

    it('should have a result[0].line_id property', function() {
      var result = freeboxAPI.call_log(session_token);

      result.then(function(value) {
        expect(value.result[0]).to.have.a.property("line_id")
      })
    })

    it('should have a result[0].name property', function() {
      var result = freeboxAPI.call_log(session_token);

      result.then(function(value) {
        expect(value.result[0]).to.have.a.property("name")
      })
    })

    it('should have a result[0].new property', function() {
      var result = freeboxAPI.call_log(session_token);

      result.then(function(value) {
        expect(value.result[0]).to.have.a.property("new")
      })
    })

  })

  describe('#get_connection_status', function() {

    var session_token = 'dumbtoken';

    beforeEach(function() {
      nock("http://mafreebox.freebox.fr")
        .get("/api/v3/connection/")
        .reply(200, {
          "success": true,
          "result": {
            "type": "ethernet",
            "rate_down": 61,
            "bytes_up": 5489542,
            "rate_up": 0,
            "bandwidth_up": 100000000,
            "ipv4": "13.37.42.42",
            "ipv6": "2a01:e30:d252:a2a0::1",
            "bandwidth_down": 100000000,
            "state": "up",
            "bytes_down": 13332830,
            "media": "ftth"
          }
        });
    })

    it('should return a fulfilled promise', function() {
      var result = freeboxAPI.get_connection_status(session_token);

      return expect(result).to.be.fulfilled
    })


    it('should be an object', function() {
      var result = freeboxAPI.get_connection_status(session_token);

      return result.then(function(value) {
        expect(value).to.be.an("object")
      })
    })

    it('should have a success property', function() {
      var result = freeboxAPI.get_connection_status(session_token);

      return result.then(function(value) {
        expect(value).to.have.a.property("success")
      })
    })

    it('should have a result property that is an object', function() {
      var result = freeboxAPI.get_connection_status(session_token);

      return result.then(function(value) {
        expect(value).to.have.a.property("result")
        expect(value.result).to.be.an("object")
      })
    })

    var properties = ["type", "rate_down", "bytes_up", "rate_up", "bandwidth_up", "ipv4", "ipv6", "bandwidth_down", "state", "bytes_down", "media"]
    properties.forEach(function(property) {
      it('should have a result.'+property+' property', function() {
        var result = freeboxAPI.get_connection_status(session_token);

        return result.then(function(value) {
          expect(value.result).to.have.a.property(property)
        })
      })
    })
  })

  describe('#get_connection_config', function() {

    var session_token = 'dumbtoken';

    beforeEach(function() {
      nock("http://mafreebox.freebox.fr")
        .get("/api/v3/connection/config/")
        .reply(200, {
          "success": true,
          "result": {
            "ping": true,
            "is_secure_pass": false,
            "remote_access_port": 80,
            "remote_access": false,
            "wol": false,
            "adblock": false,
            "adblock_not_set": false,
            "api_remote_access": true,
            "allow_token_request": true,
            "remote_access_ip": "312.13.37.42"
          }
        });
    })

    it('should return a fulfilled promise', function() {
      var result = freeboxAPI.get_connection_config(session_token);

      return expect(result).to.be.fulfilled
    })


    it('should be an object', function() {
      var result = freeboxAPI.get_connection_config(session_token);

      return result.then(function(value) {
        expect(value).to.be.an("object")
      })
    })

    it('should have a success property', function() {
      var result = freeboxAPI.get_connection_config(session_token);

      return result.then(function(value) {
        expect(value).to.have.a.property("success")
      })
    })

    it('should have a result property that is an object', function() {
      var result = freeboxAPI.get_connection_config(session_token);

      return result.then(function(value) {
        expect(value).to.have.a.property("result")
        expect(value.result).to.be.an("object")
      })
    })

    var properties = ["ping", "is_secure_pass", "remote_access_port", "remote_access", "wol", "adblock", "adblock_not_set", "api_remote_access", "allow_token_request", "remote_access_ip"]
    properties.forEach(function(property) {
      it('should have a result.'+property+' property', function() {
        var result = freeboxAPI.get_connection_config(session_token);

        return result.then(function(value) {
          expect(value.result).to.have.a.property(property)
        })
      })
    })
  })

})
