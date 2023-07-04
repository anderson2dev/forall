import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class Topic1688308240595 implements MigrationInterface {
  /**
    id: string;
    upvotes: number;
    downvotes: number;
    title: string;
    description: string;
    comments: Array<DomainComment>;
    author: DomainUser;
    enabled: boolean;
    createdAt: Date;
    updatedAt: Date;
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.createTable(
        new Table({
          name: 'topics',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'uuid',
            },
            { name: 'upvotes', type: 'int', isNullable: false, default: 0 },
            { name: 'downvotes', type: 'int', isNullable: false, default: 0 },
            { name: 'title', type: 'varchar', isNullable: false },
            { name: 'description', type: 'text', isNullable: false },
            { name: 'created_at', type: 'timestamp', default: 'now()' },
            { name: 'updated_at', type: 'timestamp', default: 'now()' },
            { name: 'enabled', type: 'boolean', default: true },
            { name: 'author_id', type: 'uuid', isNullable: false },
          ],
          foreignKeys: [
            {
              name: 'FKTopicAuthor',
              columnNames: ['author_id'],
              referencedTableName: 'users',
              referencedColumnNames: ['id'],
            },
          ],
        }),
      );

      await queryRunner.addColumn(
        'users',
        new TableColumn({
          name: 'topics_id',
          type: 'uuid',
          isNullable: true,
        }),
      );

      await queryRunner.createForeignKey(
        'users',
        new TableForeignKey({
          name: 'FKUserTopic',
          columnNames: ['topics_id'],
          referencedTableName: 'topics',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
        }),
      );
    } catch (error) {
      console.error(error);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.dropTable('topics');
      await queryRunner.dropColumn('users', 'topics_id');
    } catch (error) {
      console.error(error);
    }
  }
}
