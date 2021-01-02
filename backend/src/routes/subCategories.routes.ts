import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import SubCategory from '../models/SubCategory';

// import SubCategorysRepository from '../repositories/SubCategorysRepository';
import CreateSubCategoryService from '../services/SubCategory/CreateSubCategoryService';
import DeleteSubCategoryService from '../services/SubCategory/DeleteSubCategoryService';
import UpdateSubCategoryService from '../services/SubCategory/UpdateSubCategoryService';

const subCategoriesRouter = Router();

subCategoriesRouter.get('/', async (request: Request, response: Response) => {
  const subCategoryRepository = getRepository(SubCategory);

  const subCategories = await subCategoryRepository.find();

  return response.json(subCategories);
});

subCategoriesRouter.post('/', async (request: Request, response: Response) => {
  const { title } = request.body;

  const createSubCategoryService = new CreateSubCategoryService();

  const subCategory = await createSubCategoryService.execute({ title });

  return response.json(subCategory);
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

subCategoriesRouter.put(
  '/:id',
  async (request: Request, response: Response) => {
    const { id } = request.params;
    const { title } = request.body;

    const updateSubCategoryService = new UpdateSubCategoryService();

    const subCategory = await updateSubCategoryService.execute({ id, title });

    return response.json(subCategory);
  },
);

export default subCategoriesRouter;
