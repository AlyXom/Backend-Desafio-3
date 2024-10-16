import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsEntity } from './products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {

    constructor(@InjectRepository(ProductsEntity) private productRepository: Repository<ProductsEntity>) {}

    async getAll(category?: number, is_new?: string, discount?: number, order?: "asc" | "desc") {
        let products = await this.productRepository.find()

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
        if(discount) {
            let allDiscount = products.filter((product) => product.discount_percent === discount)

            products = [...allDiscount]
        }

        return products
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
