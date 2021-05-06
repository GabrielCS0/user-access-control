import { Permission } from '@entities/Permission'
import { PermissionRepository } from '@repositories/PermissionRepository'
import { getCustomRepository, Repository } from 'typeorm'

interface ICreatePermission {
  name: string;
  description: string;
}

class PermissionService {
  private permissionRepository: Repository<Permission>

  constructor () {
    this.permissionRepository = getCustomRepository(PermissionRepository)
  }

  async create ({ name, description }: ICreatePermission) {
    const permissionAlreadyExists = await this.permissionRepository.findOne({ name })

    if (permissionAlreadyExists) { throw new Error('Permission already exists!') }

    const permission = this.permissionRepository.create({ name, description })

    await this.permissionRepository.save(permission)

    return permission
  }
}

export { PermissionService }
