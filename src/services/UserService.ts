import { User } from '@entities/User'
import { UserRepository } from '@repositories/UserRepository'
import { getCustomRepository, Repository } from 'typeorm'
import { hash } from 'bcryptjs'

interface ICreateUser {
  name: string;
  username: string;
  password: string;
}

class UserService {
  private userRepository: Repository<User>

  constructor () {
    this.userRepository = getCustomRepository(UserRepository)
  }

  async create ({ name, username, password }: ICreateUser) {
    const userAlreadyExists = await this.userRepository.findOne({ username })

    if (userAlreadyExists) { throw new Error('User alredy exists!') }

    const hashedPassword = await hash(password, 10)

    const user = this.userRepository.create({
      name,
      username,
      password: hashedPassword
    })

    await this.userRepository.save(user)

    delete user.password
    return user
  }
}

export { UserService }
