import { Permission } from '@entities/Permission'
import { Role } from '@entities/Role'
import { PermissionRepository } from '@repositories/PermissionRepository'
import { RoleRepository } from '@repositories/RoleRepository'
import { getCustomRepository, Repository } from 'typeorm'

interface ICreateRole {
  name: string;
  description: string;
  permissions: string[];
}

class RoleService {
  private roleRepository: Repository<Role>
  private permissionRepository: Repository<Permission>

  constructor () {
    this.roleRepository = getCustomRepository(RoleRepository)
    this.permissionRepository = getCustomRepository(PermissionRepository)
  }

  async create ({ name, description, permissions }: ICreateRole) {
    const roleAlreadyExists = await this.roleRepository.findOne({ name })

    if (roleAlreadyExists) { throw new Error('Role already exists!') }

    const existsPermissions = await this.permissionRepository.findByIds(permissions)

    const role = this.roleRepository.create({
      name,
      description,
      permission: existsPermissions
    })

    await this.roleRepository.save(role)

    return role
  }
}

export { RoleService }
