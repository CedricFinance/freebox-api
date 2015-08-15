var Freebox = require('./src/index.js')

var nock = require('nock')
nock.disableNetConnect();
nock('http://mafreebox.freebox.fr')
  .get('/api_version')
  .reply(200, {
    api_base_url: "/api",
    api_version: "3.0",
    device_name: "Freebox Server",
    device_type: "FreeboxServer1,1"
  });
nock('http://mafreebox.freebox.fr')
  .post('/api/v3/login/authorize')
  .reply(200, {
    success: true,
    result: {
      app_token: 'dumbtoken',
      track_id: 1
    }
  });
nock('http://mafreebox.freebox.fr')
  .get('/api/v3/login/authorize/1')
  .reply(200, {
    success: true,
    result: {
      status: 'pending',
      challenge: 'dumbChallenge',
      password_salt: 'dumbSalt'
    }
  });
nock('http://mafreebox.freebox.fr')
  .get('/api/v3/login/authorize/1')
  .reply(200, {
    success: true,
    result: {
      status: 'granted',
      challenge: 'dumbChallenge',
      password_salt: 'dumbSalt'
    }
  })

var freebox = new Freebox({ api_path: "/api/v3" });

freebox.api_version()
  .then(console.log)
  .catch(console.log);

freebox.authorize({
  app_id: 'com.finandric.freebox',
  app_name: 'Node Freebox',
  app_version: '0.0.1',
  device_name: 'Laptop'
}).then(function(data) {
  var authorize_result = data.result;
  function track(result) {
    freebox.track_authorization_progress(result.track_id).then(function(data) {
      if (data.result.status === "granted") {
        console.log("Authorization granted", result);
      } else {
        console.log("Authorization", data.result.status);
        console.log("Retrying in 5 seconds");
        setTimeout(track, 5 * 1000, result);
      }
    })
  }
  track(authorize_result);
}).catch(console.error);
