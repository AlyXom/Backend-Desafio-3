import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './categories.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {

    constructor(@InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>) {}

    async getAllCategories() {
        return this.categoryRepository.find()
    }
}
