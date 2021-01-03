import { getRepository } from 'typeorm';

import SubCategory from '../../models/SubCategory';

import AppError from '../../errors/AppError';

interface Request {
  id: string;
  title: string
}

class UpdateSubCategoryService {
  public async execute({ id, title }: Request): Promise<SubCategory> {
    const subCategoryRepository = getRepository(SubCategory);

    const subCategory = await subCategoryRepository.findOne(id);

    if (!subCategory) {
      throw new AppError('Id invalid');
    }

    if(!title) {
      throw new AppError("The title field cannot be null");
    }

    const checkExistsSubCategoryTitle = await subCategoryRepository.findOne({
      where: { title }
    });

    if (checkExistsSubCategoryTitle) {
      throw new AppError('This subCategory title is alredy used');
    }

    subCategory.title = title;

    await subCategoryRepository.save(subCategory);

    return subCategory;

  }
}

export default UpdateSubCategoryService;
