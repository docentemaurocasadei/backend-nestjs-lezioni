import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSummaryToPosts1775488445544 implements MigrationInterface {
  name = 'AddSummaryToPosts1775488445544';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "posts" ADD "summary" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "summary"`);
  }
}
