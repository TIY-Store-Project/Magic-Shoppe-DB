const express = require('express');
const app = express();
const Product = require('./models/product');
const routes = require('./routes');
// const models = require('./models.js');

// var pg = require('pg');
//
// pg.defaults.ssl = true;
// pg.connect(process.env.DATABASE_URL, function(err, client) {
//   if (err) throw err;
//   console.log('Connected to postgres! Getting schemas...');
//
//   client
//     .query('SELECT table_schema,table_name FROM information_schema.tables;')
//     .on('row', function(row) {
//       console.log(JSON.stringify(row));
//     });
// });

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use(routes);

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
