// src/modules/products/products.controller.ts
import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '../../common/guards/auth.guard';
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AuthGuard)
  @Get()
  getAllProducts() {
    return this.productsService.getAllProducts();
  }
  @Delete('/:id')
  deleteProduct(@Param('id') id: number) {
    return this.productsService.deleteProduct(id);
  }
}
