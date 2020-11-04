const express = require("express");
const routes = require('./routes');
const cors = require("cors");

require('./database');

const app = express();

app.use(express.json());
app.use(cors());

app.use(routes);

module.exports = app;
//yarn sequelize-cli model:generate --name FormPayment --attributes description:string --migrations-path "src/database/migrations" --models-path "src/models"

