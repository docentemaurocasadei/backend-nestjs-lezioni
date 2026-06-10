import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1775894228261 implements MigrationInterface {
  name = 'Init1775894228261';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "posts" ADD "category_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "posts" ADD CONSTRAINT "FK_852f266adc5d67c40405c887b49" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "posts" DROP CONSTRAINT "FK_852f266adc5d67c40405c887b49"`,
    );
    await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "category_id"`);
    await queryRunner.query(`DROP TABLE "categories"`);
  }
}
