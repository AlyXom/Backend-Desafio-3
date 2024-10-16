import { Controller, Get } from "@nestjs/common";
import { CategoriesService } from "./categories.service";

@Controller("categories")
export class CategoryController {

    constructor(private readonly categoryService: CategoriesService) {}

    @Get()
    async getCategories() {
        return this.categoryService.getAllCategories()
    }
}