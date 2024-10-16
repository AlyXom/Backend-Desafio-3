import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { queryParamsDto } from 'src/utils/query-param.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}


  @Get()
  async show(
    @Query("category") category: string,
    @Query("is_new") is_new: string,
    @Query("discount") discount: string,
    @Query("order") order: "asc" | "desc"
  ) {

    return this.productsService.getAll(Number(category), is_new, Number(discount), order)
    
  }

  @Get(":id")
  async getOne(@Param("id") id: number) {
    return this.productsService.findOne(id)
  }
}