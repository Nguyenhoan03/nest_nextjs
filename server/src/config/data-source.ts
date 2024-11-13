import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Product } from '../modules/products/entities/product.entity';
import { config } from 'dotenv';
import { registerAs } from '@nestjs/config';
import { Category } from 'src/modules/category/entities/category.entity';
import { User } from 'src/modules/users/entities/user.entity';
config();

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Product,Category,User],
  synchronize: true, 
  logging: true,
};

export default registerAs('typeorm', () => databaseConfig);