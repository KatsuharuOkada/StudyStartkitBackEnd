import { MigrationInterface, QueryRunner } from 'typeorm';

export class initDB1687925751231 implements MigrationInterface {
  name = 'initDB1687925751231';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`admins\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`fullName\` varchar(255) NULL, UNIQUE INDEX \`IDX_051db7d37d478a69a7432df147\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`regions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`postCode\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_8c7c94041b664cdbd336b0f712\` (\`postCode\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` enum ('CLINIC_MASTER', 'DOCTOR') NOT NULL, \`description\` varchar(255) NULL, UNIQUE INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`doctors\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`fullName\` varchar(255) NULL, \`clinicId\` int NOT NULL, \`roleId\` int NOT NULL, UNIQUE INDEX \`IDX_62069f52ebba471c91de5d59d6\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`clinics\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`firstAddress\` varchar(255) NULL, \`secondAddress\` varchar(255) NULL, \`phoneNumber\` varchar(255) NULL, \`cityId\` int NOT NULL, UNIQUE INDEX \`IDX_58953011c57cc9bf5b38182e45\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`cities\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`postCode\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`regionId\` int NOT NULL, UNIQUE INDEX \`IDX_86088d056b239fef3a2accc5e3\` (\`postCode\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`families\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`user_families\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`isOwner\` tinyint NOT NULL DEFAULT '0', \`userId\` int NOT NULL, \`familyId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NULL, \`firstName\` varchar(255) NULL, \`lastName\` varchar(255) NULL, \`nickName\` varchar(255) NULL, \`gender\` enum ('N/A', 'Male', 'Female') NOT NULL DEFAULT 'N/A', \`birthDate\` date NULL, \`phoneNumber\` varchar(255) NULL, \`appStatus\` tinyint NOT NULL DEFAULT '0', \`paymentDate\` date NULL, \`isVerified\` tinyint NOT NULL DEFAULT '0', \`gatewayId\` varchar(255) NULL, \`isInvited\` tinyint NOT NULL DEFAULT '0', \`cityId\` int NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_05b30cc11f6dd22303a1bfe6f3\` (\`gatewayId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`device_tokens\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deviceToken\` varchar(255) NULL, \`uuid\` varchar(255) NOT NULL, \`userId\` int NOT NULL, UNIQUE INDEX \`IDX_1d6565ae0d71c371eb24620add\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`photos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`url\` varchar(255) NOT NULL, \`comment\` varchar(255) NULL, \`user_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`comments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`comment\` varchar(255) NULL, \`user_id\` int NOT NULL, \`photo_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`devices\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`device_name\` varchar(255) NULL, \`os\` enum ('N/A', 'iOS', 'Android') NOT NULL DEFAULT 'N/A', \`uuid\` varchar(255) NOT NULL, \`osVersion\` varchar(255) NOT NULL, \`manufacturer\` varchar(255) NOT NULL, \`status\` enum ('Available', 'Leased', 'Broken') NOT NULL DEFAULT 'Available', UNIQUE INDEX \`IDX_707b5b8b374103d40974e670d3\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`projects\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`project_code\` varchar(255) NOT NULL, \`project_name\` varchar(255) NOT NULL, \`project_description\` varchar(255) NOT NULL, \`startDate\` datetime NULL, \`endDate\` datetime NULL, UNIQUE INDEX \`IDX_11b19c7d40d07fc1a4e167995e\` (\`project_code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`skills\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`skill_name\` varchar(255) NOT NULL, \`language\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_6c500b27556245e209296e8a3f\` (\`skill_name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`projects_skills\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`project_id\` int NOT NULL, \`skill_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`reset_password_histories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`token\` varchar(255) NOT NULL, \`expiresAt\` datetime NOT NULL, \`userId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`system_settings\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`key\` varchar(255) NOT NULL, \`value\` varchar(255) NULL, UNIQUE INDEX \`IDX_b1b5bc664526d375c94ce9ad43\` (\`key\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`users_devices\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`rent_date\` datetime NOT NULL, \`return_date\` datetime NOT NULL, \`user_id\` int NOT NULL, \`device_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`doctors\` ADD CONSTRAINT \`FK_01f41c4435b1e13060e05fdd557\` FOREIGN KEY (\`clinicId\`) REFERENCES \`clinics\`(\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`doctors\` ADD CONSTRAINT \`FK_d80a7372e76a89c23ecc21cc5fe\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`clinics\` ADD CONSTRAINT \`FK_40601e3a9b5c4325384c2947320\` FOREIGN KEY (\`cityId\`) REFERENCES \`cities\`(\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`cities\` ADD CONSTRAINT \`FK_53122d8c74ee70061deb5343f78\` FOREIGN KEY (\`regionId\`) REFERENCES \`regions\`(\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`user_families\` ADD CONSTRAINT \`FK_b008f7a48b652a625a403865539\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`user_families\` ADD CONSTRAINT \`FK_8e7bec2dc53d66d1c63ebbc9fd0\` FOREIGN KEY (\`familyId\`) REFERENCES \`families\`(\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD CONSTRAINT \`FK_3785318df310caf8cb8e1e37d85\` FOREIGN KEY (\`cityId\`) REFERENCES \`cities\`(\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`device_tokens\` ADD CONSTRAINT \`FK_511957e3e8443429dc3fb00120c\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`photos\` ADD CONSTRAINT \`FK_c4404a2ee605249b508c623e68f\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_4c675567d2a58f0b07cef09c13d\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_0e5021e2518ea59f2efaf051500\` FOREIGN KEY (\`photo_id\`) REFERENCES \`photos\`(\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`projects_skills\` ADD CONSTRAINT \`FK_5e7257e7cd7d211aaee71c7691f\` FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`projects_skills\` ADD CONSTRAINT \`FK_1935ee703881aedc750f9dbd0a0\` FOREIGN KEY (\`skill_id\`) REFERENCES \`skills\`(\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`reset_password_histories\` ADD CONSTRAINT \`FK_22cc7f58ffbf2d1475e53e10dff\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`users_devices\` ADD CONSTRAINT \`FK_5c1e33b849f11ac223b6192d2df\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE \`users_devices\` ADD CONSTRAINT \`FK_7d3640c873c0cd3cfad4eb6de91\` FOREIGN KEY (\`device_id\`) REFERENCES \`devices\`(\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users_devices\` DROP FOREIGN KEY \`FK_7d3640c873c0cd3cfad4eb6de91\``);
    await queryRunner.query(`ALTER TABLE \`users_devices\` DROP FOREIGN KEY \`FK_5c1e33b849f11ac223b6192d2df\``);
    await queryRunner.query(
      `ALTER TABLE \`reset_password_histories\` DROP FOREIGN KEY \`FK_22cc7f58ffbf2d1475e53e10dff\``
    );
    await queryRunner.query(`ALTER TABLE \`projects_skills\` DROP FOREIGN KEY \`FK_1935ee703881aedc750f9dbd0a0\``);
    await queryRunner.query(`ALTER TABLE \`projects_skills\` DROP FOREIGN KEY \`FK_5e7257e7cd7d211aaee71c7691f\``);
    await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_0e5021e2518ea59f2efaf051500\``);
    await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_4c675567d2a58f0b07cef09c13d\``);
    await queryRunner.query(`ALTER TABLE \`photos\` DROP FOREIGN KEY \`FK_c4404a2ee605249b508c623e68f\``);
    await queryRunner.query(`ALTER TABLE \`device_tokens\` DROP FOREIGN KEY \`FK_511957e3e8443429dc3fb00120c\``);
    await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_3785318df310caf8cb8e1e37d85\``);
    await queryRunner.query(`ALTER TABLE \`user_families\` DROP FOREIGN KEY \`FK_8e7bec2dc53d66d1c63ebbc9fd0\``);
    await queryRunner.query(`ALTER TABLE \`user_families\` DROP FOREIGN KEY \`FK_b008f7a48b652a625a403865539\``);
    await queryRunner.query(`ALTER TABLE \`cities\` DROP FOREIGN KEY \`FK_53122d8c74ee70061deb5343f78\``);
    await queryRunner.query(`ALTER TABLE \`clinics\` DROP FOREIGN KEY \`FK_40601e3a9b5c4325384c2947320\``);
    await queryRunner.query(`ALTER TABLE \`doctors\` DROP FOREIGN KEY \`FK_d80a7372e76a89c23ecc21cc5fe\``);
    await queryRunner.query(`ALTER TABLE \`doctors\` DROP FOREIGN KEY \`FK_01f41c4435b1e13060e05fdd557\``);
    await queryRunner.query(`DROP TABLE \`users_devices\``);
    await queryRunner.query(`DROP INDEX \`IDX_b1b5bc664526d375c94ce9ad43\` ON \`system_settings\``);
    await queryRunner.query(`DROP TABLE \`system_settings\``);
    await queryRunner.query(`DROP TABLE \`reset_password_histories\``);
    await queryRunner.query(`DROP TABLE \`projects_skills\``);
    await queryRunner.query(`DROP INDEX \`IDX_6c500b27556245e209296e8a3f\` ON \`skills\``);
    await queryRunner.query(`DROP TABLE \`skills\``);
    await queryRunner.query(`DROP INDEX \`IDX_11b19c7d40d07fc1a4e167995e\` ON \`projects\``);
    await queryRunner.query(`DROP TABLE \`projects\``);
    await queryRunner.query(`DROP INDEX \`IDX_707b5b8b374103d40974e670d3\` ON \`devices\``);
    await queryRunner.query(`DROP TABLE \`devices\``);
    await queryRunner.query(`DROP TABLE \`comments\``);
    await queryRunner.query(`DROP TABLE \`photos\``);
    await queryRunner.query(`DROP INDEX \`IDX_1d6565ae0d71c371eb24620add\` ON \`device_tokens\``);
    await queryRunner.query(`DROP TABLE \`device_tokens\``);
    await queryRunner.query(`DROP INDEX \`IDX_05b30cc11f6dd22303a1bfe6f3\` ON \`users\``);
    await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
    await queryRunner.query(`DROP TABLE \`users\``);
    await queryRunner.query(`DROP TABLE \`user_families\``);
    await queryRunner.query(`DROP TABLE \`families\``);
    await queryRunner.query(`DROP INDEX \`IDX_86088d056b239fef3a2accc5e3\` ON \`cities\``);
    await queryRunner.query(`DROP TABLE \`cities\``);
    await queryRunner.query(`DROP INDEX \`IDX_58953011c57cc9bf5b38182e45\` ON \`clinics\``);
    await queryRunner.query(`DROP TABLE \`clinics\``);
    await queryRunner.query(`DROP INDEX \`IDX_62069f52ebba471c91de5d59d6\` ON \`doctors\``);
    await queryRunner.query(`DROP TABLE \`doctors\``);
    await queryRunner.query(`DROP INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` ON \`roles\``);
    await queryRunner.query(`DROP TABLE \`roles\``);
    await queryRunner.query(`DROP INDEX \`IDX_8c7c94041b664cdbd336b0f712\` ON \`regions\``);
    await queryRunner.query(`DROP TABLE \`regions\``);
    await queryRunner.query(`DROP INDEX \`IDX_051db7d37d478a69a7432df147\` ON \`admins\``);
    await queryRunner.query(`DROP TABLE \`admins\``);
  }
}
