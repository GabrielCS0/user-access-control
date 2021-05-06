import { Column, CreateDateColumn, Entity, PrimaryColumn, ManyToMany, JoinTable } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Role } from './Role'

@Entity('users')
class User {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'users_roles',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'role_id' }]
  })
  roles: Role[]

  constructor () {
    if (!this.id) { this.id = uuid() }
  }
}

export { User }
