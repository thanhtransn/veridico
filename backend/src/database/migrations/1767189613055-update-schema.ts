import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSchema1767189613055 implements MigrationInterface {
    name = 'UpdateSchema1767189613055'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "organisation_id" integer`);
        await queryRunner.query(`ALTER TABLE "organisation" DROP COLUMN "date_ofincorporation"`);
        await queryRunner.query(`ALTER TABLE "organisation" ADD "date_ofincorporation" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c7a4825eaaf9118259b890ad65d" FOREIGN KEY ("organisation_id") REFERENCES "organisation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c7a4825eaaf9118259b890ad65d"`);
        await queryRunner.query(`ALTER TABLE "organisation" DROP COLUMN "date_ofincorporation"`);
        await queryRunner.query(`ALTER TABLE "organisation" ADD "date_ofincorporation" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "organisation_id"`);
    }

}
