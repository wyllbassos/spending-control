import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import PaymentMode from '../models/PaymentMode';
import Category from '../models/Category';
import SubCategory from '../models/SubCategory';

const categoriesRouter = Router();

categoriesRouter.get('/', async (request: Request, response: Response) => {
  const paymentModeRepository = getRepository(PaymentMode);
  const categoryRepository = getRepository(Category);
  const subCategoryRepository = getRepository(SubCategory);

  const paymentModes = await paymentModeRepository.find({
    order: { title: 'ASC' },
  });
  const categories = await categoryRepository.find({ order: { title: 'ASC' } });
  const subCategories = await subCategoryRepository.find({
    order: { title: 'ASC' },
  });

  return response.json({
    paymentModes,
    categories,
    subCategories,
  });
});

export default categoriesRouter;
