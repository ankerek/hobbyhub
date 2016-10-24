import express from 'express';
import path from 'path';
import morgan from 'morgan';
import config from '../configs';
import routes from './routes';

const app = express();

const publicPath = '/';
const outputPath = path.resolve(process.cwd(), 'static');

app.use('/static', express.static(outputPath));

// server index.html file in production
if(config.env === 'production') {
  app.get('*', (req, res) => res.sendFile(path.resolve(outputPath, 'index.html')));
}

app.use(morgan('tiny'));
app.use(routes);

// error-handling middleware
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(err);
  return res.status(err.status || 500).json('Něco se pokazilo');
});

app.listen(config.port, function() {
  console.log(`Server started: http://${config.host}:${config.port}/`);
});