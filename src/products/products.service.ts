import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsEntity } from './products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {

    constructor(@InjectRepository(ProductsEntity) private productRepository: Repository<ProductsEntity>) {}

    async getAll(limit?: number, page?: number ,category?: number, is_new?: string, discount?: number, order?: "ASC" | "DESC") {
        if(page <= 0 || !page) {
            page = 1
        }
        
        if(limit <= 8 || !limit) {
            limit = 8
        }

        let query = this.productRepository.createQueryBuilder("product")

        if (category) {
            query = query.where("product.category_id = :categoryId", { categoryId: category })
        }

        if (is_new) {
            query = query.andWhere("product.is_new = :isNew", { isNew: is_new === "true" })
        }

        if (order) {
            query = query.orderBy("product.name", order)
        }

        if (discount > 0) {
            query = query.andWhere("product.discount_percent = :discount", { discount })
        }

        const [products, total] = await query.getManyAndCount()

        const paginatedProducts = products.slice((page - 1) * limit, page * limit);

        return {
            products: paginatedProducts,
            total,
            currentPage: page,
            totalPages: Math.ceil(total / limit)
        }
    }

    async findOne(id: number) {
        const product = await this.productRepository.findOne({
            where: {
                id
            }
        })

        if(!product) {
            throw new NotFoundException(`Produto com ID: ${id} não foi encontrado.`)
        }

        return product
    }

}
