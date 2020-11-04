const Sequelize  = require('sequelize');
const dbConfig = require('../config/database');
const connection = new Sequelize(dbConfig);

const FormPayment = require('../models/FormPayment');

FormPayment.init(connection);

//User.associate(connection.models);

module.exports = connection;