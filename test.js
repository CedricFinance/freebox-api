var Freebox = require('./src/index.js')

var freebox = new Freebox();

freebox.api_url()
  .then(console.log)
  .catch(console.log);
