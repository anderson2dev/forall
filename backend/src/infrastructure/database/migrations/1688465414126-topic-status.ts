import { MigrationInterface, QueryRunner } from 'typeorm';

export class TopicStatus1688465414126 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query(`
          CREATE TYPE topic_status AS ENUM ('OPEN', 'CLOSED');
        `);
      await queryRunner.query(
        `ALTER TABLE "topics" ADD COLLUMN "status" topic_status NOT NULL DEFAULT 'OPEN'`,
      );
    } catch (error) {
      console.error(error);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query(`ALTER TABLE "topics" DROP COLUMN "status"`);
      await queryRunner.query(`DROP TYPE topic_status`);
    } catch (error) {
      console.error(error);
    }
  }
}
