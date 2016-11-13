import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from '../configs/passport';
import path from 'path';
import morgan from 'morgan';
import config from '../configs';
import routes from './routes';

const app = express();

mongoose.connect(config.mongodb);
mongoose.connection.on('error', () => {
  console.info('Error: Could not connect to MongoDB.');
});

// initialize express json body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('tiny'));
app.use(passport.initialize());
app.use(routes);

app.use('/static', express.static(path.resolve(process.cwd(), 'client', 'static')));

// server index.html file in production
if(config.env === 'production') {
  const publicPath = '/';
  const outputPath = path.resolve(process.cwd(), 'static');

  app.use(publicPath, express.static(outputPath));
  app.use('/static', express.static(path.resolve(outputPath, 'apidoc')));
  app.get('/static/apidoc', (req, res) => res.sendFile(path.resolve(outputPath, 'apidoc', 'index.html')));

  app.get('*', (req, res) => res.sendFile(path.resolve(outputPath, 'index.html')));
}



// error-handling middleware
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(err);
  return res.status(err.status || 500).json('Něco se pokazilo');
});

app.listen(config.port, function() {
  console.log(`Server started: http://${config.host}:${config.port}/`);
});
