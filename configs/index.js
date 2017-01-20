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
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY
}, myconfig);