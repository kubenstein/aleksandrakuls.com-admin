const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const basicAuthExpressMiddleware = require('./basic-auth').default;
const ConcertRepository = require('./concert-repository');


// ------------- serv setup ---------------
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
  ConcertRepository.all().then((concerts) => {
    return res.json(concerts);
  });
});

app.post('/api/concerts', (req, res) => {
  const concert = req.body.concert;
  ConcertRepository.add(concert).then((addedConcert) => {
    return res.json(addedConcert);
  });
});

app.post('/api/concerts/:id', (req, res) => {
  const id = req.params.id;
  const concert = req.body.concert;
  ConcertRepository.update(id, concert).then((updatedConcert) => {
    return res.json(updatedConcert);
  });
});

app.delete('/api/concerts/:id', (req, res) => {
  const id = req.params.id;
  ConcertRepository.remove(id).then((removedConcert) => {
    return res.json(removedConcert);
  });
});


// ----------------- go! ------------------
app.listen(process.env.PORT || 8081);
