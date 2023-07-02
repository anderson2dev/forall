import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class Comment1688309625600 implements MigrationInterface {
  /**
    id: string;
    author: User;
    topic: DomainTopic;
    referencedComments: Array<DomainComment>;
    content: string;
    upvotes: number;
    downvotes: number;
    enabled: boolean;
    createdAt: Date;
    updatedAt: Date;
  */
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.createTable(
        new Table({
          name: 'comments',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'uuid',
            },
            { name: 'content', type: 'text', isNullable: false },
            { name: 'upvotes', type: 'int', isNullable: false, default: 0 },
            { name: 'downvotes', type: 'int', isNullable: false, default: 0 },
            { name: 'created_at', type: 'timestamp', default: 'now()' },
            { name: 'updated_at', type: 'timestamp', default: 'now()' },
            { name: 'enabled', type: 'boolean', default: true },
            { name: 'author_id', type: 'uuid', isNullable: false },
            { name: 'topic_id', type: 'uuid', isNullable: false },
            { name: 'referenced_comment_id', type: 'uuid', isNullable: true },
          ],
          foreignKeys: [
            {
              name: 'FKCommentAuthor',
              columnNames: ['author_id'],
              referencedTableName: 'users',
              referencedColumnNames: ['id'],
            },
            {
              name: 'FKCommentTopic',
              columnNames: ['topic_id'],
              referencedTableName: 'topics',
              referencedColumnNames: ['id'],
            },
            {
              name: 'FKCommentReferencedComment',
              columnNames: ['referenced_comment_id'],
              referencedTableName: 'comments',
              referencedColumnNames: ['id'],
            },
          ],
        }),
      );

      await queryRunner.addColumn(
        'topics',
        new TableColumn({
          name: 'comments_id',
          type: 'uuid',
          isNullable: true,
        }),
      );

      await queryRunner.createForeignKey(
        'topics',
        new TableForeignKey({
          name: 'FKTopicComment',
          columnNames: ['comments_id'],
          referencedTableName: 'comments',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
        }),
      );

      await queryRunner.addColumn(
        'users',
        new TableColumn({
          name: 'comments_id',
          type: 'uuid',
          isNullable: true,
        }),
      );

      await queryRunner.createForeignKey(
        'users',
        new TableForeignKey({
          name: 'FKUserComment',
          columnNames: ['comments_id'],
          referencedTableName: 'comments',
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
      await queryRunner.dropTable('comments');
      await queryRunner.dropColumn('topics', 'comments_id');
    } catch (error) {
      console.error(error);
    }
  }
}
