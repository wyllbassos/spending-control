import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';

import Category from '../../models/Category';

interface Request {
  title: string;
}

class CreateCategoryService {
  public async execute({ title }: Request): Promise<Category> {
    const categoryRepository = getRepository(Category);

    if(!title) {
      throw new AppError("The title field cannot be null");
    }

    const checkCategoryExists = await categoryRepository.findOne({
      where: { title },
    });

    if (checkCategoryExists) {
      return checkCategoryExists;
    }

    const category = categoryRepository.create({ title });

    await categoryRepository.save(category);

    return category;
  }
}

export default CreateCategoryService;
