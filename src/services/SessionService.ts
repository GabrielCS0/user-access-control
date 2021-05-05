import { User } from '@entities/User'
import { UserRepository } from '@repositories/UserRepository'
import { getCustomRepository, Repository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface ICreateSession {
  username: string;
  password: string;
}

class SessionService {
  private userRepository: Repository<User>

  constructor () {
    this.userRepository = getCustomRepository(UserRepository)
  }

  async create ({ username, password }: ICreateSession) {
    const user = await this.userRepository.findOne({ username })

    if (!user) { throw new Error('User not found!') }

    const matchPassword = await compare(password, user.password)

    if (!matchPassword) { throw new Error('Incorrect username or password') }

    const token = sign({}, process.env.SECRET, {
      subject: user.id,
      expiresIn: '1d'
    })

    delete user.password
    return { user, token }
  }
}

export { SessionService }
