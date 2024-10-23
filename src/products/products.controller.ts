import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}


  @Get()
  async show(
    @Query("limit") limit: number,
    @Query("page") page: number,
    @Query("category") category: string,
    @Query("is_new") is_new: string,
    @Query("discount") discount: string,
    @Query("order") order: "ASC" | "DESC"
  ) {

    return this.productsService.getAll(Number(limit), Number(page), Number(category), is_new, Number(discount), order)
    
  }

  @Get(":id")
  async getOne(@Param("id") id: number) {
    return this.productsService.findOne(id)
  }
}