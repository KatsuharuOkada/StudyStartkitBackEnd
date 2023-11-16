import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateDB1697733526345 implements MigrationInterface {
  name = 'updateDB1697733526345';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`devices\` CHANGE \`manufacturer\` \`manufacturer\` varchar(255) NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`devices\` CHANGE \`manufacturer\` \`manufacturer\` varchar(255) NOT NULL`);
  }
}
