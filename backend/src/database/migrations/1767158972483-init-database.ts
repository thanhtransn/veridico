import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1767158972483 implements MigrationInterface {
    name = 'InitDatabase1767158972483'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "organisation" ("id" SERIAL NOT NULL, "company_name" character varying NOT NULL, "uen" character varying NOT NULL, "registered_address" character varying NOT NULL, "business_type" character varying NOT NULL, "date_ofincorporation" character varying NOT NULL, "natrue_of_business" character varying NOT NULL, "status_of_company" character varying NOT NULL, "company_size" integer NOT NULL, "paid_up_capital" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_by_id" uuid, CONSTRAINT "UQ_7acfa60b4ef3ab9f0155c913d57" UNIQUE ("uen"), CONSTRAINT "PK_c725ae234ef1b74cce43d2d00c1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "mobile_number" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'User', "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_9d6d873483c7fae39567c209192" UNIQUE ("mobile_number"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "organisation" ADD CONSTRAINT "FK_6f7f46f14706a98b7c73fc95fd9" FOREIGN KEY ("created_by_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organisation" DROP CONSTRAINT "FK_6f7f46f14706a98b7c73fc95fd9"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "organisation"`);
    }

}
