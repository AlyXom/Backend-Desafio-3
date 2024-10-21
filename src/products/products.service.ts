import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsEntity } from './products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {

    constructor(@InjectRepository(ProductsEntity) private productRepository: Repository<ProductsEntity>) {}

    async getAll(limit?: number, page?: number ,category?: number, is_new?: string, discount?: number, order?: "asc" | "desc") {
        let query = this.productRepository.createQueryBuilder("product")

        if(page <= 0 || !page) {
            page = 1
        }

        if(limit <= 8 || !limit) {
            limit = 8
        }

        query.take(limit)
        query.skip((page - 1) * limit)
        let [products, total] = await query.getManyAndCount()


        if(order == "asc") {
            products.sort((a, b) => a.price - b.price)
        } else if(order == 'desc') {
            products.sort((a, b) => b.price - a.price)
        }

        if(category) {
            let categories = products.filter((product) => product.category_id === category)

            products = [...categories]
        }
        if(is_new) {
            let allNew = products.filter((product) => product.is_new === (is_new === "true"))

            products = [...allNew]
        }
        if(discount > 0) {
            let allDiscount = products.filter((product) => product.discount_percent === discount)

            products = [...allDiscount]
        }

        return {
            products,
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
