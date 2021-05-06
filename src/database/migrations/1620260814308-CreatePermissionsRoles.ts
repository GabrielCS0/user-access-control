import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreatePermissionsRoles1620260814308 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'permissions_roles',
        columns: [
          {
            name: 'role_id',
            type: 'uuid'
          },

          {
            name: 'permission_id',
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
            name: 'FKPermission',
            referencedTableName: 'permissions',
            referencedColumnNames: ['id'],
            columnNames: ['permission_id'],
            onDelete: 'CASCADE',
            onUpdate: 'SET NULL'
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('permissions_roles')
  }
}
