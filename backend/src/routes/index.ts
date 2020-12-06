import { Router } from 'express';

import transactionsRouter from './transactions.routes';
import categoriesRouter from './categories.routes';
import subCategoriesRouter from './subCategories.routes';
import paymentModesRouter from './paymentModes.routes';

const routes = Router();

routes.use('/transactions', transactionsRouter);
routes.use('/categories', categoriesRouter);
routes.use('/sub-categories', subCategoriesRouter);
routes.use('/payment-modes', paymentModesRouter);

export default routes;
