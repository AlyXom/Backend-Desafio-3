import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CategoryEntity } from './categories/categories.entity';
import { ProductsEntity } from './products/products.entity';

@Module({
  imports: [
  ProductsModule,
  CategoriesModule,
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, "..", "public")
  }),
  ConfigModule.forRoot(),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [CategoryEntity, ProductsEntity],
    synchronize: true
  }),
  
],
  controllers: [],
  providers: [],
})
export class AppModule {}