import Document from '@modules/analysis/infra/typeorm/entities/Document';

export default interface IDocumentsRepository {
  create(documents: string): Promise<Document>;
}
