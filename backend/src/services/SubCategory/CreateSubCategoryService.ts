import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';

import SubCategory from '../../models/SubCategory';

interface Request {
  title: string;
}

class CreateSubCategoryService {
  public async execute({ title }: Request): Promise<SubCategory> {
    const subCategoryRepository = getRepository(SubCategory);

    if(!title) {
      throw new AppError("The title field cannot be null");
    }

    const checkSubCategoryExists = await subCategoryRepository.findOne({
      where: { title },
    });

    if (checkSubCategoryExists) {
      return checkSubCategoryExists;
    }

    const subCategory = subCategoryRepository.create({ title });

    await subCategoryRepository.save(subCategory);

    return subCategory;
  }
}

export default CreateSubCategoryService;
