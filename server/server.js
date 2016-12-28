const express = require('express');
const SocketIo = require('socket.io');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const basicAuthExpressMiddleware = require('./lib/basic-auth').default;
const ConcertRepository = require('./lib/concert-repository');
const HerokuDeployer = require('./lib/heroku-deployer');

const adminUser = process.env.ADMIN_USER;
const adminPass = process.env.ADMIN_PASS;
const herokuApiKey = process.env.HEROKU_API_KEY;
const herokuAppName = process.env.HEROKU_APP_NAME;

// ------------- serv setup ---------------
const app = express();
const server = app.listen(process.env.PORT || 8081);
const io = SocketIo(server);

if (process.env.NODE_ENV === 'production') {
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

// -------------- webSockets --------------
const deployer = new HerokuDeployer(herokuAppName, herokuApiKey);

io.on('connection', (socket) => {
  socket.emit('deploymentSetup', deployer.steps());
  socket.on('deploymentStart', () => { startDeployment(socket); });
});

function startDeployment(socket) {
  deployer.deploy(
    (completedStep) => {
      socket.emit('deploymentStatusUpdate', completedStep);
    },
    (error) => {
      socket.emit('deploymentError', error.toString());
    }
  );
}
