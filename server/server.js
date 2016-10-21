import express from 'express';
import path from 'path';
import config from '../configs';
import routes from './routes';

const app = express();

app.use(routes);

if(config.env === 'production') {
  const publicPath = '/';
  const outputPath = path.resolve(process.cwd(), 'static');

  app.use(publicPath, express.static(outputPath));

  app.get('*', (req, res) => res.sendFile(path.resolve(outputPath, 'index.html')));
}

app.listen(config.port, function() {
  console.log(`Server started: http://${config.host}:${config.port}/`);
});

// webpack dev server for hot reloading
// if(config.env === 'development') {
//   require('./webpack-dev-server');
// }