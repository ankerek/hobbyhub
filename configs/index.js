try {
  var myconfig = require('./myconfig');
} catch(e) {
  console.log('myconfig.js doesn\'t exist');
}

module.exports = Object.assign({
  env: process.env.NODE_ENV || 'development',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  mongodb: process.env.MONGOLAB_URI,
}, myconfig);