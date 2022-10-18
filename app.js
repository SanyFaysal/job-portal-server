const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

// import routes
// const productRoute = require('./routes/product.route');
// routes
app.get('/', (req, res) => {
  res.send('Route is working! YaY!');
});

module.exports = app;
