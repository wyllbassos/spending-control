import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import SubCategory from '../models/SubCategory';

// import SubCategorysRepository from '../repositories/SubCategorysRepository';
import CreateSubCategoryService from '../services/SubCategory/CreateSubCategoryService';
import DeleteSubCategoryService from '../services/SubCategory/DeleteSubCategoryService';

const subCategoriesRouter = Router();

subCategoriesRouter.get('/', async (request: Request, response: Response) => {
  const subCategoryRepository = getRepository(SubCategory);

  const subCategories = await subCategoryRepository.find();

  return response.json({ subCategories });
});

subCategoriesRouter.post('/', async (request: Request, response: Response) => {
  const { title } = request.body;

  const createSubCategoryService = new CreateSubCategoryService();

  const subCategories = await createSubCategoryService.execute({ title });

  return response.json({ subCategories });
});

subCategoriesRouter.delete(
  '/:id',
  async (request: Request, response: Response) => {
    const { id } = request.params;

    const deleteSubCategoryService = new DeleteSubCategoryService();

    await deleteSubCategoryService.execute({ id });

    return response.json();
  },
);

export default subCategoriesRouter;
