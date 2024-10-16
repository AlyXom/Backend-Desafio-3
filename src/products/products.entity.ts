import { CategoryEntity } from "src/categories/categories.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: "product"})
export class ProductsEntity {
    @PrimaryGeneratedColumn({type: "integer"})
    id: number;

    @Column({length: 50})
    name: string;

    @Column({length: 10})
    sku: string

    @Column()
    category_id: number

    @ManyToOne(() => CategoryEntity, category => category.id, {nullable: false})
    @JoinColumn({name: "category_id", referencedColumnName: "id"})
    category: CategoryEntity;

    @Column({length: 250})
    description: string

    @Column({length: 500})
    large_description: string

    @Column({type: "numeric", precision: 10, scale: 2})
    price: number;

    @Column({type: "numeric", precision: 10, scale: 2, nullable: true})
    discount_price: number;

    @Column({type: "integer", nullable: true})
    discount_percent: number;

    @Column({type: "bool", nullable: true})
    is_new: boolean;

    @Column({length: 250, nullable: true})
    image_link: string;

    @Column({length: 1000, nullable: true})
    other_images_link: string;

    @CreateDateColumn({nullable: true})
    created_date: Date

    @UpdateDateColumn({nullable: true})
    updated_date: Date

}