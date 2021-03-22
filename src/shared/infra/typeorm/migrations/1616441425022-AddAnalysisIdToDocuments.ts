import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddAnalysisIdToDocuments1616441425022
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'documents',
      new TableColumn({
        name: 'analyze_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'documents',
      new TableForeignKey({
        name: 'AnalyzeDocument',
        columnNames: ['analyze_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'analysis',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('documents', 'AnalyzeDocument');

    await queryRunner.dropColumn('documents', 'analyze_id');
  }
}
