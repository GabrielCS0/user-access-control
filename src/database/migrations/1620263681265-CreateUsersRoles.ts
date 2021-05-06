import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUsersRoles1620263681265 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users_roles',
        columns: [
          {
            name: 'role_id',
            type: 'uuid'
          },

          {
            name: 'user_id',
            type: 'uuid'
          }
        ],
        foreignKeys: [
          {
            name: 'FKRole',
            referencedTableName: 'roles',
            referencedColumnNames: ['id'],
            columnNames: ['role_id'],
            onDelete: 'CASCADE',
            onUpdate: 'SET NULL'
          },

          {
            name: 'FKUser',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'SET NULL'
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users_roles')
  }
}
