import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryEntity } from './categories.entity';

@Module({
  imports: [CategoryEntity],
  providers: [CategoriesService],
  exports: [CategoryEntity]
})
export class CategoriesModule {}
