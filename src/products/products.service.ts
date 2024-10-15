import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsEntity } from './products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {

    constructor(@InjectRepository(ProductsEntity) private productRepository: Repository<ProductsEntity>) {}

    async getAll() {
        return this.productRepository.find()
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
