import { PermissionService } from '@services/PermissionService'
import { Request, Response } from 'express'

class PermissionController {
  async create (req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body

    const permissionService = new PermissionService()

    try {
      const permission = await permissionService.create({ name, description })
      return res.status(201).json(permission)
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }
}

export default new PermissionController()
