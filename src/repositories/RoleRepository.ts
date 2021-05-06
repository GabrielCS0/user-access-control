import { Role } from '@entities/Role'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(Role)
class RoleRepository extends Repository<Role> {}

export { RoleRepository }
