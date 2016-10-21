import express from 'express';
import path from 'path';
import morgan from 'morgan';
import config from '../configs';
import routes from './routes';

const app = express();

// server index.html file in production
if(config.env === 'production') {
  const publicPath = '/';
  const outputPath = path.resolve(process.cwd(), 'static');

  app.use(publicPath, express.static(outputPath));

  app.get('*', (req, res) => res.sendFile(path.resolve(outputPath, 'index.html')));
}

app.use(morgan('tiny'));
app.use(routes);

app.listen(config.port, function() {
  console.log(`Server started: http://${config.host}:${config.port}/`);
});