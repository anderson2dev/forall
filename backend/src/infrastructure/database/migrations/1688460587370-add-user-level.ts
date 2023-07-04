import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserLevel1688460587370 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query(`
        CREATE TYPE user_level AS ENUM ('COMMON', 'MOD', 'ADMIN');
      `);
      await queryRunner.query(
        `ALTER TABLE "users" ADD COLLUMN "level" user_level NOT NULL DEFAULT 'USER'`,
      );
    } catch (error) {
      console.error(error);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "level"`);
      await queryRunner.query(`DROP TYPE user_level`);
    } catch (error) {
      console.error(error);
    }
  }
}
