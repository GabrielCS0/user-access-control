import { User } from '@entities/User'
import { UserRepository } from '@repositories/UserRepository'
import { getCustomRepository, Repository } from 'typeorm'
import { hash } from 'bcryptjs'
import { Role } from '@entities/Role'
import { RoleRepository } from '@repositories/RoleRepository'

interface ICreateUser {
  name: string;
  username: string;
  password: string;
  roles: string[];
}

class UserService {
  private userRepository: Repository<User>
  private roleRepository: Repository<Role>

  constructor () {
    this.userRepository = getCustomRepository(UserRepository)
    this.roleRepository = getCustomRepository(RoleRepository)
  }

  async create ({ name, username, password, roles }: ICreateUser) {
    const userAlreadyExists = await this.userRepository.findOne({ username })

    if (userAlreadyExists) { throw new Error('User alredy exists!') }

    const hashedPassword = await hash(password, 10)

    const existsRoles = await this.roleRepository.findByIds(roles)

    const user = this.userRepository.create({
      name,
      username,
      password: hashedPassword,
      roles: existsRoles
    })

    await this.userRepository.save(user)

    delete user.password
    return user
  }
}

export { UserService }
