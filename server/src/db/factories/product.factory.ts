// src/db/factories/user.factory.ts
import { setSeederFactory } from 'typeorm-extension';
import { Product } from '../../modules/products/entities/product.entity';


export default setSeederFactory(Product, (faker) => {
  const product = new Product();

  product.title = faker.commerce.productName();
  product.price = parseFloat(faker.commerce.price());
  product.discount = faker.number.int({ min: 0, max: 50 });
  product.imageUrl = faker.image.imageUrl();
  product.description = faker.lorem.sentence();

  return product;
});
