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
// app.get('/', (req, res) => {
//   res.sendStatus(200);
// });

const dbConnect = require('./config/connection');
const models = require('./models');

const categorySeeds = require('./seeds/category-seeds');
const productSeeds = require('./seeds/product-seeds');
const productTagSeeds = require('./seeds/product-tag-seeds');
const tagSeeds = require('./seeds/tag-seeds');

const e = require('express');
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
  .then(() => {
    categorySeeds();
    productSeeds();
    productTagSeeds();
    tagSeeds();
    return Promise.resolve(true);
  })
  .catch(e => {
    console.error(e);
  });

////////////////////////////////
// Error Handler
///////////////////////////////

async function errHandler(err) {
  console.error(err)
  process.exit(1)
}

process.on('uncaughtException', errHandler)
process.on('unhandledRejection', errHandler)

////////////////////////////////////////////


// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
}).on('error', err => {
  console.error(err)
});

