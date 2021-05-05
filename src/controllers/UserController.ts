import { UserService } from '@services/UserService'
import { Request, Response } from 'express'

class UserController {
  async create (req: Request, res: Response): Promise<Response> {
    const { name, username, password } = req.body

    const userService = new UserService()

    try {
      const user = await userService.create({ name, username, password })
      return res.status(201).json(user)
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }
}

export default new UserController()
