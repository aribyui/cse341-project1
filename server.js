const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes/index');
const mongodb = require('./data/database');

app.use(express.json()); // Allow us to read the body of the request object

// ❓
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/', routes);

mongodb.initDb((err) => {
  if(err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and node running at port: ${port}`);
    });
  }
});
