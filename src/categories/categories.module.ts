import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryEntity } from './categories.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './categories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [CategoryController],
  providers: [CategoriesService],
  exports: [TypeOrmModule]
})
export class CategoriesModule {}
