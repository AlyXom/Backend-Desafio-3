import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: "category"})
export class CategoryEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50})
    name: string;

    @Column({length: 250, nullable: true})
    image_link: string;

    @CreateDateColumn({nullable: true})
    created_date: Date;

    @UpdateDateColumn({nullable: true})
    updated_date: Date;
}