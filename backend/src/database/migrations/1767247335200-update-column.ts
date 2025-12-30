import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateColumn1767247335200 implements MigrationInterface {
    name = 'UpdateColumn1767247335200'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organisation" ALTER COLUMN "company_size" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "organisation" ALTER COLUMN "paid_up_capital" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organisation" ALTER COLUMN "paid_up_capital" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "organisation" ALTER COLUMN "company_size" SET NOT NULL`);
    }

}
