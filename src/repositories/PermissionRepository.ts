import { Permission } from '@entities/Permission'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(Permission)
class PermissionRepository extends Repository<Permission> {}

export { PermissionRepository }
