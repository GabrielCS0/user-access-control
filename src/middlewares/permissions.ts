import { User } from '@entities/User'
import { UserRepository } from '@repositories/UserRepository'
import { NextFunction, Request, Response } from 'express'
import { decode } from 'jsonwebtoken'
import { getCustomRepository } from 'typeorm'

class Permissions {
  private async decoder (req: Request): Promise<User> {
    const authHeader = req.headers.authorization
    if (typeof authHeader !== 'string') { return undefined }

    const [, token] = authHeader.split(' ')
    if (token === undefined) { return undefined }

    const payload = decode(token)

    const userRepository = getCustomRepository(UserRepository)
    const user = await userRepository.findOne(payload.sub, {
      relations: ['roles']
    })

    return user
  }

  is (role: string[]) {
    const roleAuthorized = async (req: Request, res: Response, next: NextFunction) => {
      const user = await this.decoder(req)

      if (user === undefined) { return res.status(401).json({ error: 'Not Authorized!' }) }

      const userRoles = user.roles.map(role => role.name)

      const existsRoles = userRoles.some(r => role.includes(r))

      if (existsRoles) { return next() }

      return res.status(401).json({ error: 'Not Authorized!' })
    }

    return roleAuthorized
  }
}

export default new Permissions()
