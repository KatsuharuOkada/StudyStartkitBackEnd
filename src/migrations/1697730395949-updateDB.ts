import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateDB1697730395949 implements MigrationInterface {
  name = 'updateDB1697730395949';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`IDX_11b19c7d40d07fc1a4e167995e\` ON \`projects\``);
    await queryRunner.query(
      `CREATE TABLE \`project_members\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`role\` enum ('Developer', 'Bpm', 'Unknow') NOT NULL DEFAULT 'Unknow', \`join_date\` datetime(6) NOT NULL COMMENT 'time join project' DEFAULT CURRENT_TIMESTAMP(6), \`project_id\` int NOT NULL, \`member_id\` int NOT NULL, UNIQUE INDEX \`IDX_df51d4119de342c17b2b11566d\` (\`project_id\`, \`member_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(`ALTER TABLE \`projects\` DROP COLUMN \`endDate\``);
    await queryRunner.query(`ALTER TABLE \`projects\` DROP COLUMN \`project_code\``);
    await queryRunner.query(`ALTER TABLE \`projects\` DROP COLUMN \`project_description\``);
    await queryRunner.query(`ALTER TABLE \`projects\` DROP COLUMN \`project_name\``);
    await queryRunner.query(`ALTER TABLE \`projects\` DROP COLUMN \`startDate\``);
    await queryRunner.query(`ALTER TABLE \`projects\` ADD \`code\` varchar(255) NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`projects\` ADD UNIQUE INDEX \`IDX_d95a87318392465ab663a32cc4\` (\`code\`)`);
    await queryRunner.query(`ALTER TABLE \`projects\` ADD \`name\` varchar(255) NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`projects\` ADD \`description\` varchar(255) NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`projects\` ADD \`start_date\` datetime NULL`);
    await queryRunner.query(`ALTER TABLE \`projects\` ADD \`end_date\` datetime NULL`);
    await queryRunner.query(
      `ALTER TABLE \`project_members\` ADD CONSTRAINT \`FK_b5729113570c20c7e214cf3f58d\` FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`project_members\` ADD CONSTRAINT \`FK_0fe49d1dbe3867d97de555f675b\` FOREIGN KEY (\`member_id\`) REFERENCES \`users\`(\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`project_members\` DROP FOREIGN KEY \`FK_0fe49d1dbe3867d97de555f675b\``);
    await queryRunner.query(`ALTER TABLE \`project_members\` DROP FOREIGN KEY \`FK_b5729113570c20c7e214cf3f58d\``);
    await queryRunner.query(`ALTER TABLE \`projects\` DROP COLUMN \`end_date\``);
    await queryRunner.query(`ALTER TABLE \`projects\` DROP COLUMN \`start_date\``);
    await queryRunner.query(`ALTER TABLE \`projects\` DROP COLUMN \`description\``);
    await queryRunner.query(`ALTER TABLE \`projects\` DROP COLUMN \`name\``);
    await queryRunner.query(`ALTER TABLE \`projects\` DROP INDEX \`IDX_d95a87318392465ab663a32cc4\``);
    await queryRunner.query(`ALTER TABLE \`projects\` DROP COLUMN \`code\``);
    await queryRunner.query(`ALTER TABLE \`projects\` ADD \`startDate\` datetime NULL`);
    await queryRunner.query(`ALTER TABLE \`projects\` ADD \`project_name\` varchar(255) NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`projects\` ADD \`project_description\` varchar(255) NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`projects\` ADD \`project_code\` varchar(255) NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`projects\` ADD \`endDate\` datetime NULL`);
    await queryRunner.query(`DROP INDEX \`IDX_df51d4119de342c17b2b11566d\` ON \`project_members\``);
    await queryRunner.query(`DROP TABLE \`project_members\``);
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_11b19c7d40d07fc1a4e167995e\` ON \`projects\` (\`project_code\`)`
    );
  }
}
