const express = require('express');
const routes = express.Router();

const FormPaymentControllers = require('./controllers/FormPaymentControllers');
const CategoryControllers = require('./controllers/CategoryControllers');
const SubCategoryControllers = require('./controllers/SubCategoryControllers');

routes.get('/form-payments', FormPaymentControllers.index);
routes.post('/form-payments', FormPaymentControllers.store);

//routes.get('/users/:user_id/techs', TechController.index);
//routes.post('/users/:user_id/techs', TechController.store);
//routes.delete('/users/:user_id/techs', TechController.delete);

module.exports = routes;