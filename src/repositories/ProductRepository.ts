import { Product } from '@entities/Product'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(Product)
class ProductRepository extends Repository<Product> {}

export { ProductRepository }
