import { SessionService } from '@services/SessionService'
import { Request, Response } from 'express'

class SessionController {
  async create (req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body

    const sessionService = new SessionService()

    try {
      const session = await sessionService.create({ username, password })
      return res.status(200).json(session)
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }
}

export default new SessionController()
