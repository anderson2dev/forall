import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class User1688307556570 implements MigrationInterface {
  /**
      id: string;
      login: string;
      password: string;
      profile: DomainProfile;
      comments: Array<DomainComment>;
      createdTopics: Array<DomainTopic>;
      createdAt: Date;
      updatedAt: Date;
      enabled: boolean;
    */
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.createTable(
        new Table({
          name: 'users',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'uuid',
            },
            { name: 'login', type: 'varchar', isNullable: false },
            { name: 'password', type: 'varchar', isNullable: false },
            { name: 'created_at', type: 'timestamp', default: 'now()' },
            { name: 'updated_at', type: 'timestamp', default: 'now()' },
            { name: 'enabled', type: 'boolean', default: true },
            { name: 'profile_id', type: 'uuid', isNullable: false },
          ],
          foreignKeys: [
            {
              name: 'FKUserProfile',
              columnNames: ['profile_id'],
              referencedTableName: 'profiles',
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
      await queryRunner.dropTable('users');
    } catch (error) {
      console.error(error);
    }
  }
}
