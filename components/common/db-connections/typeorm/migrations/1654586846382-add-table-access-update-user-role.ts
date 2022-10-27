import { MigrationInterface, QueryRunner } from 'typeorm';

export class addTableAccessUpdateUserRole1654586846382
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    create table accesses (
        id int generated by default as identity primary key,
        name varchar(150) not null,
        type varchar(150) not null,
        origin_id varchar not null,
        group_id varchar not null,
        created_at timestamptz not null,
        updated_at timestamptz not null
      )
    `);
    await queryRunner.query(
      `grant select, insert, update, delete on table accesses to migrator`,
    );
    await queryRunner.query(`alter table users add column role varchar`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `REVOKE SELECT, INSERT, UPDATE, DELETE ON accesses FROM migrator`,
    );
    await queryRunner.query(`DROP TABLE accesses`);
    await queryRunner.query(`alter table users drop column role`);
  }
}
