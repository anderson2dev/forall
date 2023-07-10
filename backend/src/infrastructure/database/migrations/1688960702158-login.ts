import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class Login1688960702158 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.addColumns('user', [
        new TableColumn({
          name: 'hashRefreshToken',
          type: 'varchar',
          isNullable: true,
        }),
        new TableColumn({
          name: 'userRole',
          enumName: 'userRole',
          type: 'enum',
        }),
        new TableColumn({
          name: 'lastLogin',
          type: 'timestamp',
          isNullable: true,
        }),
      ]);
    } catch (error) {
      console.log(error);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.dropColumns('user', [
        'hashRefreshToken',
        'userRole',
        'lastLogin',
      ]);
    } catch (error) {
      console.log(error);
    }
  }
}
