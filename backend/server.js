const express = require('express');
const SocketIo = require('socket.io');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const basicAuthExpressMiddleware = require('./lib/basic-auth').default;
const ConcertRepository = require('./lib/concert-repository');
const HerokuDeployer = require('./lib/heroku-deployer');

const mongoDbUri = process.env.MONGODB_URI;
const adminUser = process.env.ADMIN_USER;
const adminPass = process.env.ADMIN_PASS;
const herokuApiKey = process.env.HEROKU_API_KEY;
const herokuAppName = process.env.HEROKU_APP_NAME;

// ------------- serv setup ---------------
const app = express();
const server = app.listen(process.env.PORT || 8081);
const io = SocketIo(server);
const concertRepository = new ConcertRepository(mongoDbUri);

if (!herokuApiKey && !herokuAppName) {
  throw new Error('\n!!\n!! HEROKU_API_KEY, HEROKU_APP_NAME env vars have to be set!\n!!');
}

if (process.env.NODE_ENV === 'production') {
  if (!adminUser && !adminPass) {
    throw new Error('\n!!\n!! ADMIN_USER, ADMIN_PASS env vars have to be set!\n!!');
  }
  app.use(basicAuthExpressMiddleware(adminUser, adminPass));
}

app.use(morgan('combined'));
app.use(express.static('build/'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// ---------------- routes ----------------
app.get('/api/concerts', (req, res) => {
  concertRepository.all().then((concerts) => {
    return res.json(concerts);
  });
});

app.post('/api/concerts', (req, res) => {
  const concert = req.body.concert;
  concertRepository.add(concert).then((addedConcert) => {
    return res.json(addedConcert);
  });
});

app.post('/api/concerts/:id', (req, res) => {
  const id = req.params.id;
  const concert = req.body.concert;
  concertRepository.update(id, concert).then((updatedConcert) => {
    return res.json(updatedConcert);
  });
});

app.delete('/api/concerts/:id', (req, res) => {
  const id = req.params.id;
  concertRepository.softRemove(id).then((removedConcert) => {
    return res.json(removedConcert);
  });
});

// -------------- webSockets --------------
const deployer = new HerokuDeployer(herokuAppName, herokuApiKey);

io.on('connection', (socket) => {
  socket.emit('deploymentSetup', deployer.steps());
  socket.on('deploymentStart', () => { initializeDeployment(socket); });
});

function initializeDeployment(socket) {
  return Promise.resolve()
  .then(() => { concertRepository.removeAllSoftRemoved(); })
  .then(() => {
    return deployer.deploy((completedStep) => {
      socket.emit('deploymentStatusUpdate', completedStep);
    });
  })
  .then(() => { return concertRepository.markAllAsDeployed(); })
  .then(() => { socket.emit('deploymentFinished', ''); })
  .catch((error) => { socket.emit('deploymentError', error.toString()); });
}
