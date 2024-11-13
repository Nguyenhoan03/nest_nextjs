// src/modules/products/products.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}
  async getAllProducts(): Promise<Product[]> {
    return this.productsRepository.find();
  }
  async deleteProduct(id: number): Promise<string> {
    await this.productsRepository.delete(id);
    return `Product with ID ${id} has been deleted.`;
  }
}
