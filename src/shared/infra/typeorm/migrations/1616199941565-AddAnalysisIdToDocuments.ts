import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddAnalysisIdToDocuments1616199173739
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
    await queryRunner.dropForeignKey('analysis', 'AnalyzeDocument');

    await queryRunner.dropColumn('analysis', 'analyze_id');
  }
}
