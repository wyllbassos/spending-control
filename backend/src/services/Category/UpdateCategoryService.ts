import { getRepository } from 'typeorm';

import Category from '../../models/Category';

import AppError from '../../errors/AppError';

interface Request {
  id: string;
  title: string
}

class UpdateCategoryService {
  public async execute({ id, title }: Request): Promise<Category> {
    const categoryRepository = getRepository(Category);

    const category = await categoryRepository.findOne(id);

    if (!category) {
      throw new AppError('Id invalid');
    }

    if(!title) {
      throw new AppError("The title field cannot be null");
    }

    const checkExistsCategoryTitle = await categoryRepository.findOne({
      where: { title }
    });

    if (checkExistsCategoryTitle) {
      throw new AppError('This category title is alredy used');
    }

    category.title = title;

    await categoryRepository.save(category);

    return category;

  }
}

export default UpdateCategoryService;
