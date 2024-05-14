import { MigrationInterface, QueryRunner } from "typeorm";

export class DbInitial1715706785384 implements MigrationInterface {
    name = 'DbInitial1715706785384'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_books" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "bookId" integer NOT NULL, "userScore" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_629bc1a648860619b0f75f5dfe6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "books" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "totalScore" double precision NOT NULL DEFAULT '0', "scoringCount" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_books" ADD CONSTRAINT "FK_89eac0a6cb08bda7516c319c914" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_books" ADD CONSTRAINT "FK_daa39d872eb7e189a1fea05be7c" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_books" DROP CONSTRAINT "FK_daa39d872eb7e189a1fea05be7c"`);
        await queryRunner.query(`ALTER TABLE "user_books" DROP CONSTRAINT "FK_89eac0a6cb08bda7516c319c914"`);
        await queryRunner.query(`DROP TABLE "books"`);
        await queryRunner.query(`DROP TABLE "user_books"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
