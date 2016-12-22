const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
const basicAuthMiddleware = require('./basic-auth').default;


// ------------- serv setup ---------------
const app = express();

if (process.env.NODE_ENV === 'production') {
  const adminUser = process.env.ADMIN_USER;
  const adminPass = process.env.ADMIN_PASS;
  if (!adminUser && !adminPass) {
    throw new Error('\n!!\n!! ADMIN_USER, ADMIN_PASS env lets have to be set!\n!!\n!!');
  }
  app.use(basicAuthMiddleware(adminUser, adminPass));
}

app.use(morgan('combined'));
app.use(express.static('build/'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// ------------------ db ------------------
let concerts = {
  1: { id: '1', date: '2014-12-02', textPL: 'concert text PL 1', textEN: 'concert text EN 1' }
};


// ---------------- routes ----------------
app.get('/api/concerts', (req, res) => {
  res.json(_.values(concerts));
});

app.post('/api/concerts', (req, res) => {
  const id = Math.random().toString();
  const concert = req.body.concert;
  concert.id = id;
  concerts[id] = concert;
  res.json(concert);
});

app.post('/api/concerts/:id', (req, res) => {
  const id = req.params.id;
  const concert = req.body.concert;
  concerts[id] = concert;
  res.json(concert);
});

app.delete('/api/concerts/:id', (req, res) => {
  const id = req.params.id;
  const concert = _.clone(concerts[id]);
  concerts = _.remove(concerts, { id: id });
  res.json(concert);
});


// ----------------- go! ------------------
app.listen(process.env.PORT || 8081);
