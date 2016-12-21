var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var _ = require('lodash');
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

app.use(morgan('combined'));
app.use(express.static('build/'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ------------------ db ------------------
var concerts = {
  1: { id: '1', date: '2014-12-02', textPL: 'concert text PL 1', textEN: 'concert text EN 1' }
}

// ---------------- routes ----------------
app.get('/api/concerts', function(req, res) {
  res.json(_.values(concerts));
});

app.post('/api/concerts', function(req, res) {
  const id = Math.random().toString();
  var concert = req.body.concert;
  concert.id = id;
  concerts[id] = concert;
  res.json(concert);
});

app.post('/api/concerts/:id', function(req, res) {
  const id = req.params.id;
  var concert = req.body.concert;
  concerts[id] = concert;
  res.json(concert);
});

app.delete('/api/concerts/:id', function(req, res) {
  const id = req.params.id;
  const concert = _.clone(concerts[id]);
  concerts = _.remove(concerts, {id: id});
  res.json(concert);
});


// ----------------- go! ------------------
app.listen(process.env.PORT || 8081);
