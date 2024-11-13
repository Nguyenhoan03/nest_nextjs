// src/db/seeds/product.seeder.ts
import { Product } from 'src/modules/products/entities/product.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class ProductSeeder implements Seeder {
   public async run(
    _dataSource: DataSource,
    FactoryManager: SeederFactoryManager
   ): Promise<void> {
    const productFactory = FactoryManager.get(Product);
    await productFactory.saveMany(100);
   }
}