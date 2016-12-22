const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongojs = require('mongojs');
const normalizeMongoResponse = require('./utils').normalizeMongoResponse;
const basicAuthExpressMiddleware = require('./basic-auth').default;


// ------------- serv setup ---------------
const db = mongojs('localhost/db', ['concerts']);
const app = express();

if (process.env.NODE_ENV === 'production') {
  const adminUser = process.env.ADMIN_USER;
  const adminPass = process.env.ADMIN_PASS;
  if (!adminUser && !adminPass) {
    throw new Error('\n!!\n!! ADMIN_USER, ADMIN_PASS env lets have to be set!\n!!\n!!');
  }
  app.use(basicAuthExpressMiddleware(adminUser, adminPass));
}

app.use(morgan('combined'));
app.use(express.static('build/'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// ---------------- routes ----------------
app.get('/api/concerts', (req, res) => {
  db.concerts.find((err, concerts) => {
    return res.json(normalizeMongoResponse(concerts));
  });
});

app.post('/api/concerts', (req, res) => {
  const concert = req.body.concert;
  db.concerts.insert(concert, (err, addedConcert) => {
    return res.json(normalizeMongoResponse(addedConcert));
  });
});

app.post('/api/concerts/:id', (req, res) => {
  const id = req.params.id;
  const concert = req.body.concert;
  db.concerts.findAndModify({
    query: { _id: mongojs.ObjectId(id) },
    update: { $set: concert },
    new: true
  }, (err, updatedConcert) => {
    return res.json(normalizeMongoResponse(updatedConcert));
  });
});

app.delete('/api/concerts/:id', (req, res) => {
  const id = req.params.id;
  db.concerts.findOne({ _id: mongojs.ObjectId(id) }, (_findErr, concert) => {
    db.concerts.remove({ _id: mongojs.ObjectId(id) }, { justOne: true }, (_removeErr) => {
      return res.json(normalizeMongoResponse(concert));
    });
  });
});


// ----------------- go! ------------------
app.listen(process.env.PORT || 8081);
