var express = require('express');
var morgan = require('morgan');

var app = express();

app.use(express.static('build/'));
app.use(morgan('combined'))

app.get('/api/concerts', function(req, res) {
  res.json([]);
});

app.listen(process.env.PORT || 8081);
