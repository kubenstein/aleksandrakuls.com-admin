var express = require('express');
var morgan = require('morgan');
var basicAuthMiddleware = require('./basic-auth').default;

// ------------- serv setup ---------------
var app = express();
if (process.env.NODE_ENV === 'production') {
  var adminUser = process.env.ADMIN_USER;
  var adminPass = process.env.ADMIN_PASS;
  if (!adminUser && !adminPass)
    throw "!!\n!!\n!! ADMIN_USER, ADMIN_PASS env vars have to be set!\n!!\n!!";

  app.use(basicAuthMiddleware(adminUser, adminPass));
}

app.use(express.static('build/'));
app.use(morgan('combined'));

// ---------------- routes ----------------
app.get('/api/concerts', function(req, res) {
  res.json([]);
});


// ----------------- go! ------------------
app.listen(process.env.PORT || 8081);
