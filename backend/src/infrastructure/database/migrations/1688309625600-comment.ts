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
            { name: 'createdAt', type: 'timestamp', default: 'now()' },
            { name: 'updatedAt', type: 'timestamp', default: 'now()' },
            { name: 'enabled', type: 'boolean', default: true },
            { name: 'authorId', type: 'uuid', isNullable: false },
            { name: 'topicId', type: 'uuid', isNullable: false },
            { name: 'referencedCommentId', type: 'uuid', isNullable: true },
          ],
          foreignKeys: [
            {
              name: 'FKCommentAuthor',
              columnNames: ['authorId'],
              referencedTableName: 'users',
              referencedColumnNames: ['id'],
            },
            {
              name: 'FKCommentTopic',
              columnNames: ['topicId'],
              referencedTableName: 'topics',
              referencedColumnNames: ['id'],
            },
            {
              name: 'FKCommentReferencedComment',
              columnNames: ['referencedCommentId'],
              referencedTableName: 'comments',
              referencedColumnNames: ['id'],
            },
          ],
        }),
      );

      await queryRunner.addColumn(
        'topics',
        new TableColumn({
          name: 'commentsId',
          type: 'uuid',
          isNullable: true,
        }),
      );

      await queryRunner.createForeignKey(
        'topics',
        new TableForeignKey({
          name: 'FKTopicComment',
          columnNames: ['commentsId'],
          referencedTableName: 'comments',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
        }),
      );

      await queryRunner.addColumn(
        'users',
        new TableColumn({
          name: 'commentsId',
          type: 'uuid',
          isNullable: true,
        }),
      );

      await queryRunner.createForeignKey(
        'users',
        new TableForeignKey({
          name: 'FKUserComment',
          columnNames: ['commentsId'],
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
      await queryRunner.dropColumn('topics', 'commentsId');
    } catch (error) {
      console.error(error);
    }
  }
}
