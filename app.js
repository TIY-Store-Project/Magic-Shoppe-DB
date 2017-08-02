const express = require('express');
const app = express();
const DATABASE_URL = 'postgres://nhjmletkimtlmh:e8554d8a3c284d97b8c32a10fc421e107a8bd6a209bf369e5243f0936965a88f@ec2-54-235-80-137.compute-1.amazonaws.com:5432/d930h5kkc4sqc0'

var pg = require('pg');

pg.defaults.ssl = true;
pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

  client
    .query('SELECT table_schema,table_name FROM information_schema.tables;')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
