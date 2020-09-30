const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const sslRedirect = require('./util/sslRedirect');
const compression = require('compression');

const appRoutes = require('./routes');

const app = express();

app.disable('x-powered-by');
app.set('port', process.env.PORT || 3001);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(fileUpload());
app.use(cors());

if (
  process.env.NODE_ENV === 'production' &&
  process.env.HTTPS === 'enabled'
) {
  app.use(sslRedirect(301));
}

/* Routes */
app.use('/api', appRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(compression());

  app.use(express.static(path.join(__dirname, '../client/build'), {
    etag: true,
    lastModified: true,
    setHeaders: (res, path) => {
      const hashRegExp = new RegExp('\\.[0-9a-f]{8}\\.');

      if (path.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
      } else if (hashRegExp.test(path)) {
        res.setHeader('Cache-Control', 'max-age=31536000');
      }
    },
  }));

  app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

/* Error handler */
app.use((error, req, res, next) => {
  res.statusMessage = error.message;
  res.status(error.status);
  res.end();
});

/* Start a server */
app.listen(app.get('port'), () => {
  console.log(`Server started: http://localhost:${app.get('port')}/`);
});
