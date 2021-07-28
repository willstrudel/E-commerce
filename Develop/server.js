require('dotenv').config();




const express = require('express');
const routes = require('./routes');
const sequelize = require('sequelize');
// import sequelize connection



const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
app.get('/', (req, res) => {
  res.sendStatus(200);
});

const dbConnect = require('./config/connection');
const models = require('./models');
models.Category.sync()
  .then(() => {
    return models.Product.sync();
  })
  .then(() =>{
    return models.Tag.sync();
  })
  .then(() =>{
    return models.ProductTag.sync();
  })
  .then(() =>{
    require('./seeds');
  })
  .catch(e => {
    console.error(e);
  });

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

