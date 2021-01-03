import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Category from '../models/Category';

// import CategorysRepository from '../repositories/CategorysRepository';
import CreateCategoryService from '../services/Category/CreateCategoryService';
import DeleteCategoryService from '../services/Category/DeleteCategoryService';
import UpdateCategoryService from '../services/Category/UpdateCategoryService';

const categoriesRouter = Router();

categoriesRouter.get('/', async (request: Request, response: Response) => {
  const categoryRepository = getRepository(Category);

  const categories = await categoryRepository.find({ order: { title: 'ASC' } });

  return response.json(categories);
});

categoriesRouter.post('/', async (request: Request, response: Response) => {
  const { title } = request.body;

  const createCategoryService = new CreateCategoryService();

  const category = await createCategoryService.execute({ title });

  return response.json(category);
});

categoriesRouter.delete(
  '/:id',
  async (request: Request, response: Response) => {
    const { id } = request.params;

    const deleteCategoryService = new DeleteCategoryService();

    await deleteCategoryService.execute({ id });

    return response.json();
  },
);

categoriesRouter.put(
  '/:id',
  async (request: Request, response: Response) => {
    const { id } = request.params;
    const { title } = request.body;

    const updateCategoryService = new UpdateCategoryService();

    const category = await updateCategoryService.execute({ id, title });

    return response.json(category);
  },
);

export default categoriesRouter;
