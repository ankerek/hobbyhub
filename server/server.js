import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';
import morgan from 'morgan';
import config from '../configs';
import routes from './routes';

const app = express();

mongoose.connect(config.mongodb, (err) => {
    if (err) throw err;
});

// initialize express json body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// server index.html file in production
if(config.env === 'production') {
  const publicPath = '/';
  const outputPath = path.resolve(process.cwd(), 'static');

  app.use(publicPath, express.static(outputPath));
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
