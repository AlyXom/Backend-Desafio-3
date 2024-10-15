import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Filters } from 'src/decorators/filters.decorator';
import { queryParamsDto } from 'src/utils/query-param.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}


  @Get()
  async show(@Filters("category", "isNew") category: string, isNew: string) {
    console.log(category, isNew)
    return this.productsService.getAll()
  }

  @Get(":id")
  async getOne(@Param("id") id: number) {
    return this.productsService.findOne(id)
  }
}