const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload');
const cors = require('cors');

const appRoutes = require('./routes');

const app = express();

app.set('port', process.env.PORT || 3001);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser())
app.use(fileUpload());
app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

/* Routes */
app.use('/api', appRoutes);

/* Error handler */
app.use((error, req, res, next) => {
  res.status(error.status);
  res.json({err: error.message});
});

/* Start a server */
app.listen(app.get('port'), () => {
  console.log(`Server started: http://localhost:${app.get('port')}/`);
});
