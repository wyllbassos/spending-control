import { Router } from 'express';

import transactionsRouter from './transactions.routes';
import categoriesRouter from './categories.routes';
import subCategoriesRouter from './subCategories.routes';
import formPaymentsRouter from './formPayments.routes';

const routes = Router();

routes.use('/transactions', transactionsRouter);
routes.use('/categories', categoriesRouter);
routes.use('/sub-categories', subCategoriesRouter);
routes.use('/form-payments', formPaymentsRouter);

export default routes;
