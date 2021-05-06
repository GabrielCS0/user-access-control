import { ProductService } from '@services/ProductService'
import { Request, Response } from 'express'

class ProductController {
  async create (req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body

    const productService = new ProductService()

    try {
      const product = await productService.create({ name, description })
      return res.status(201).json(product)
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }

  async showAll (req: Request, res: Response): Promise<Response> {
    const productService = new ProductService()
    const allProducts = await productService.showAll()
    return res.json(allProducts)
  }

  async showOne (req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const productService = new ProductService()
    const product = await productService.showOne(id)
    return res.json(product)
  }
}

export default new ProductController()
