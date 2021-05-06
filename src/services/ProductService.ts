import { Product } from '@entities/Product'
import { ProductRepository } from '@repositories/ProductRepository'
import { getCustomRepository, Repository } from 'typeorm'

interface ICreateProduct {
  name: string;
  description: string;
}

class ProductService {
  private productRepository: Repository<Product>

  constructor () {
    this.productRepository = getCustomRepository(ProductRepository)
  }

  async create ({ name, description }: ICreateProduct) {
    const productAlreadyExists = await this.productRepository.findOne({ name })

    if (productAlreadyExists) { throw new Error('Product already exists!') }

    const product = this.productRepository.create({ name, description })

    await this.productRepository.save(product)

    return product
  }

  async showAll () {
    const allProducts = await this.productRepository.find()
    return allProducts
  }

  async showOne (id: string) {
    const product = await this.productRepository.findOne({ id })
    return product
  }
}

export { ProductService }
