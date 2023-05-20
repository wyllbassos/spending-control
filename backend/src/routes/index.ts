import { Request, Response, Router } from 'express';

import transactionsRouter from './transactions.routes';
import categoriesRouter from './categories.routes';
import subCategoriesRouter from './subCategories.routes';
import paymentModesRouter from './paymentModes.routes';
import registers from './registers.routes';

const routes = Router();

routes.get('/health-check', async (_: Request, response: Response) => {
  return response.json('ok');
});

routes.use('/transactions', transactionsRouter);
routes.use('/categories', categoriesRouter);
routes.use('/sub-categories', subCategoriesRouter);
routes.use('/payment-modes', paymentModesRouter);
routes.use('/registers', registers);

export default routes;
