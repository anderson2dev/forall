import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Profile1688305694921 implements MigrationInterface {
  /**
    id: string;
    avatar: string;
    birthDate: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
  */
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.createTable(
        new Table({
          name: 'profiles',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'uuid',
            },
            {
              name: 'name',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'email',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'birthDate',
              type: 'date',
              isNullable: false,
            },
            {
              name: 'createdAt',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'updatedAt',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'enabled',
              type: 'boolean',
              default: true,
            },
            {
              name: 'avatarId',
              type: 'uuid',
              isNullable: true,
            },
          ],
          foreignKeys: [
            {
              name: 'FKProfileImage',
              columnNames: ['avatarId'],
              referencedTableName: 'images',
              referencedColumnNames: ['id'],
              onDelete: 'CASCADE',
            },
          ],
        }),
      );
    } catch (error) {
      console.error(error);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.dropTable('profiles');
    } catch (error) {
      console.error(error);
    }
  }
}
