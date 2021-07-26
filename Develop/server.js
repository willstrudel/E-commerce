require('dotenv').config();

const express = require('express');
const routes = require('./routes');
const sequelize = require('sequelize');
// import sequelize connection
const dbConnect = require('./config/connection');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
dbConnect.sync({ force: false , alter : true });
require('./seeds');


// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
